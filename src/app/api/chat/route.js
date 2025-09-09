// src/app/api/chat/route.js
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { ChatService } from "@/lib/chatService";

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

    let chatSessionId = sessionId;

    // Create new session if requested or if no sessionId provided
    if (createNewSession || !sessionId) {
      const sessionResult = await ChatService.createChatSession(
        session.user.id,
        message.substring(0, 50) + "..."
      );
      
      if (!sessionResult.success) {
        return NextResponse.json(
          { error: "Failed to create chat session" },
          { status: 500 }
        );
      }
      
      chatSessionId = sessionResult.sessionId;
    }

    // Get recent chat history (last 5 messages) before sending to n8n
    let chatHistory = [];
    if (chatSessionId) {
      const historyResult = await ChatService.getChatHistory(chatSessionId, 5); // NEW: limit to last 10 messages
      if (historyResult.success) {
        chatHistory = historyResult.messages || [];
      }
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

    // Enhanced company information
    const companyInfo = {
      name: "Mobarrez",
      domain: "ai agent development, web development, branding, marketing",
      services: [
        "Ai agent Development",
        "Custom Web Development",
        "E-commerce Solutions", 
        "Brand Identity Design",
        "Digital Marketing",
        "SEO Optimization",
        "UI/UX Design"
      ],
      expertise: [
        "N8n",
        "Next.js",
        "React",
        "JavaScript",
        "MongoDB",
        "TailwindCSS",
        "Node.js"
      ],
      values: [
        "Precision in progress",
        "Quality craftsmanship",
        "Client-focused solutions",
        "Innovation and creativity",
        "Reliable partnerships"
      ],
      contact: {
        website: "https://mobarrez.com",
        email: "info@mobarrez.com"
      }
    };

    // Send enhanced data to n8n workflow
    const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        userId: session.user.id,
        sessionId: chatSessionId,
        userContext: {
          name: session.user.name,
          email: session.user.email
        },
        companyInfo, // NEW: Enhanced company info
        chatHistory: chatHistory.map(msg => ({ // NEW: Chat history
          role: msg.role || msg.sender, // Handle both role and sender fields
          content: msg.content || msg.message || msg.text,
          timestamp: msg.timestamp
        })),
        metadata: { // NEW: Metadata
          totalHistoryMessages: chatHistory.length,
          hasContext: chatHistory.length > 0
        }
      })
    });

    if (!n8nResponse.ok) {
      throw new Error(`n8n webhook failed: ${n8nResponse.status}`);
    }

    const aiResponse = await n8nResponse.text();

    // Save AI response to database
    const aiMessageResult = await ChatService.saveChatMessage(
      chatSessionId,
      aiResponse,
      "ai",
      null,
      { 
        responseTime: new Date().toISOString(),
        source: "n8n_workflow",
        hadContext: chatHistory.length > 0 // NEW: Track if context was used
      }
    );

    if (!aiMessageResult.success) {
      console.error("Failed to save AI message:", aiMessageResult.error);
    }

    return NextResponse.json({
      success: true,
      response: aiResponse,
      sessionId: chatSessionId,
      messageId: aiMessageResult.messageId,
      contextUsed: chatHistory.length > 0 // NEW: Let frontend know if context was used
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
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
      const historyResult = await ChatService.getChatHistory(sessionId);
      return NextResponse.json(historyResult);
    } else {
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