// src/app/api/chat/sessions/route.js
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { ChatService } from "@/lib/chatService";

// Create new chat session
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
    const { title } = body;

    const result = await ChatService.createChatSession(
      session.user.id,
      title || "New Chat"
    );

    return NextResponse.json(result);

  } catch (error) {
    console.error("Create session API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

