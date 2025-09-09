// src/app/api/chat/route.js
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { ChatService } from "@/lib/chatService";

// Send message to AI and save to database
export async function POST(request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { message, sessionId, createNewSession = false } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Verify N8N_WEBHOOK_URL exists
    if (!process.env.N8N_WEBHOOK_URL) {
      console.error("N8N_WEBHOOK_URL environment variable is missing");
      return NextResponse.json(
        { error: "AI service configuration error" },
        { status: 500 }
      );
    }

    let chatSessionId = sessionId;

    // Create new session if requested or if no sessionId provided
    if (createNewSession || !sessionId) {
      const sessionResult = await ChatService.createChatSession(
        session.user.id,
        message.substring(0, 50) + "..." // Use first part of message as title
      );
      
      if (!sessionResult.success) {
        return NextResponse.json(
          { error: "Failed to create chat session" },
          { status: 500 }
        );
      }
      
      chatSessionId = sessionResult.sessionId;
    }

    // Save user message to database
    const userMessageResult = await ChatService.saveChatMessage(
      chatSessionId,
      message,
      "user"
    );

    if (!userMessageResult.success) {
      return NextResponse.json(
        { error: "Failed to save user message" },
        { status: 500 }
      );
    }

    console.log("Sending request to N8N:", {
      url: process.env.N8N_WEBHOOK_URL,
      userId: session.user.id,
      sessionId: chatSessionId,
      messageLength: message.length
    });

    // Enhanced N8N request with better error handling and timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // 45 second timeout (N8N takes ~5s)

    try {
      const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mobarrez-App/1.0',
          'Accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify({
          message,
          userId: session.user.id,
          sessionId: chatSessionId,
          userContext: {
            name: session.user.name,
            email: session.user.email
          },
          companyInfo: {
            name: "Mobarrez",
            domain: "web development, branding, marketing"
          },
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV || 'production'
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log("N8N Response status:", n8nResponse.status);
      console.log("N8N Response headers:", Object.fromEntries(n8nResponse.headers.entries()));

      if (!n8nResponse.ok) {
        // Try to get error details
        let errorDetails = `HTTP ${n8nResponse.status}`;
        try {
          const errorText = await n8nResponse.text();
          errorDetails += `: ${errorText}`;
        } catch (e) {
          // Ignore error reading response body
        }
        
        console.error("N8N webhook failed:", errorDetails);
        throw new Error(`n8n webhook failed: ${errorDetails}`);
      }

      // Get the response
      const contentType = n8nResponse.headers.get('content-type');
      let aiResponse;

      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = await n8nResponse.json();
        // Handle different possible response formats
        aiResponse = jsonResponse.response || jsonResponse.message || jsonResponse.text || JSON.stringify(jsonResponse);
      } else {
        aiResponse = await n8nResponse.text();
      }

      console.log("AI Response received:", {
        type: typeof aiResponse,
        length: aiResponse.length,
        preview: aiResponse.substring(0, 100) + (aiResponse.length > 100 ? '...' : '')
      });

      if (!aiResponse || aiResponse.trim() === '') {
        throw new Error("Empty response from AI service");
      }

      // Save AI response to database
      const aiMessageResult = await ChatService.saveChatMessage(
        chatSessionId,
        aiResponse,
        "ai",
        null, // intent will be determined by n8n
        { 
          responseTime: new Date().toISOString(),
          source: "n8n_workflow",
          responseStatus: n8nResponse.status
        }
      );

      if (!aiMessageResult.success) {
        console.error("Failed to save AI message:", aiMessageResult.error);
        // Continue anyway since user got the response
      }

      return NextResponse.json({
        success: true,
        response: aiResponse,
        sessionId: chatSessionId,
        messageId: aiMessageResult.messageId
      });

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      console.error("N8N fetch error:", {
        name: fetchError.name,
        message: fetchError.message,
        cause: fetchError.cause
      });

      // Handle different types of errors
      if (fetchError.name === 'AbortError') {
        // Timeout error
        return NextResponse.json(
          { 
            error: "AI service timeout - please try again",
            details: "The request took too long to process"
          },
          { status: 504 }
        );
      }

      if (fetchError.message.includes('ENOTFOUND') || fetchError.message.includes('ECONNREFUSED')) {
        // Network/DNS error
        return NextResponse.json(
          { 
            error: "AI service unavailable",
            details: "Cannot connect to AI service"
          },
          { status: 503 }
        );
      }

      // Generic fetch error
      throw fetchError;
    }

  } catch (error) {
    console.error("Chat API error:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return NextResponse.json(
      { 
        error: "Internal server error",
        details: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
      },
      { status: 500 }
    );
  }
}

// Get chat sessions for user (unchanged)
export async function GET(request) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (sessionId) {
      // Get specific chat history
      const historyResult = await ChatService.getChatHistory(sessionId);
      return NextResponse.json(historyResult);
    } else {
      // Get all user sessions
      const sessionsResult = await ChatService.getUserChatSessions(session.user.id);
      return NextResponse.json(sessionsResult);
    }

  } catch (error) {
    console.error("Get chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}