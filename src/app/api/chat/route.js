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

    // Send message to n8n workflow
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
        companyInfo: {
          name: "Mobarrez",
          domain: "web development, branding, marketing"
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
      null, // intent will be determined by n8n
      { 
        responseTime: new Date().toISOString(),
        source: "n8n_workflow"
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

  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get chat sessions for user
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