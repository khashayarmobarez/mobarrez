// src/lib/chatService.js
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export class ChatService {
  static async createChatSession(userId, title = "New Chat") {
    try {
      const client = await clientPromise;
      const db = client.db();
      const sessions = db.collection("chat_sessions");

      const session = {
        userId: new ObjectId.createFromHexString(userId),
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
        messageCount: 0,
        isActive: true
      };

      const result = await sessions.insertOne(session);
      return {
        success: true,
        sessionId: result.insertedId.toString(),
        session: { ...session, _id: result.insertedId }
      };
    } catch (error) {
      console.error("Error creating chat session:", error);
      return { success: false, error: error.message };
    }
  }

  static async saveChatMessage(sessionId, message, sender, intent = null, metadata = {}) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const messages = db.collection("chat_messages");
      const sessions = db.collection("chat_sessions");

      // Save the message
    const messageDoc = {
      sessionId: ObjectId.createFromHexString(sessionId),
      message,
      sender, // 'user' or 'ai'
      intent,
      metadata,
      timestamp: new Date()
    };

      const messageResult = await messages.insertOne(messageDoc);

      // Update session's last activity and message count
      await sessions.updateOne(
        { _id: new ObjectId.createFromHexString(sessionId) },
        { 
          $set: { updatedAt: new Date() },
          $inc: { messageCount: 1 }
        }
      );

      return {
        success: true,
        messageId: messageResult.insertedId.toString(),
        message: { ...messageDoc, _id: messageResult.insertedId }
      };
    } catch (error) {
      console.error("Error saving chat message:", error);
      return { success: false, error: error.message };
    }
  }

  static async getChatHistory(sessionId, limit = 50) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const messages = db.collection("chat_messages");

      const history = await messages
        .find({ sessionId: new ObjectId.createFromHexString(sessionId) })
        .sort({ timestamp: 1 })
        .limit(limit)
        .toArray();

      return {
        success: true,
        messages: history
      };
    } catch (error) {
      console.error("Error getting chat history:", error);
      return { success: false, error: error.message };
    }
  }

  static async getUserChatSessions(userId, limit = 20) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const sessions = db.collection("chat_sessions");

      const userSessions = await sessions
        .find({ userId: new ObjectId.createFromHexString(userId), isActive: true })
        .sort({ updatedAt: -1 })
        .limit(limit)
        .toArray();

      return {
        success: true,
        sessions: userSessions
      };
    } catch (error) {
      console.error("Error getting user sessions:", error);
      return { success: false, error: error.message };
    }
  }

  static async updateSessionTitle(sessionId, title) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const sessions = db.collection("chat_sessions");

      await sessions.updateOne(
        { _id: new ObjectId.createFromHexString(sessionId) },
        { 
          $set: { 
            title,
            updatedAt: new Date() 
          }
        }
      );

      return { success: true };
    } catch (error) {
      console.error("Error updating session title:", error);
      return { success: false, error: error.message };
    }
  }

  static async deleteSession(sessionId, userId) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const sessions = db.collection("chat_sessions");
      const messages = db.collection("chat_messages");

      // Verify ownership and soft delete
      await sessions.updateOne(
        { 
          _id: new ObjectId.createFromHexString(sessionId),
          userId: new ObjectId.createFromHexString(userId)
        },
        { 
          $set: { 
            isActive: false,
            deletedAt: new Date()
          }
        }
      );

      return { success: true };
    } catch (error) {
      console.error("Error deleting session:", error);
      return { success: false, error: error.message };
    }
  }
}