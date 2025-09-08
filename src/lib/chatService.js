import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export class ChatService {
  static async createChatSession(userId, title = "New Chat") {
    try {
      const client = await clientPromise;
      const db = client.db();
      const sessions = db.collection("chat_sessions");

      const session = {
        userId: new ObjectId(userId),  // Fixed: Using the constructor directly
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

      const messageDoc = {
        sessionId: new ObjectId(sessionId),  // Fixed: Using the constructor directly
        message,
        sender, // 'user' or 'ai'
        intent,
        metadata,
        timestamp: new Date()
      };

      const messageResult = await messages.insertOne(messageDoc);

      // Update session's last activity and message count
      await sessions.updateOne(
        { _id: new ObjectId(sessionId) },  // Fixed: Using the constructor directly
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

  static async getChatHistory(sessionId, limit = null) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const messages = db.collection("chat_messages");

      // Build query with optional limit
      if (limit && typeof limit === 'number' && limit > 0) {
        // For limited results, we want the most recent messages
        // So we sort descending, limit, then reverse
        const recentMessages = await messages
          .find({ sessionId: new ObjectId(sessionId) })
          .sort({ timestamp: -1 }) // Newest first
          .limit(limit)
          .toArray();
        
        // Reverse to get chronological order (oldest to newest)
        const messagesArray = recentMessages.reverse().map(msg => ({
          _id: msg._id.toString(),
          message: msg.content, // Note: using 'message' to match your frontend
          sender: msg.role === 'user' ? 'user' : 'ai',
          timestamp: msg.timestamp,
          intent: msg.intent,
          metadata: msg.metadata,
          // Add these for compatibility
          id: msg._id.toString(),
          text: msg.content,
          role: msg.role,
          content: msg.content
        }));

        return {
          success: true,
          messages: messagesArray,
          total: messagesArray.length,
          limited: true,
          limit: limit
        };
      } else {
        // Return all messages (existing functionality)
        const messagesArray = await messages
          .find({ sessionId: new ObjectId(sessionId) })
          .sort({ timestamp: 1 }) // Oldest first for full history
          .toArray();
        
        return {
          success: true,
          messages: messagesArray.map(msg => ({
            _id: msg._id.toString(),
            message: msg.content, // Note: using 'message' to match your frontend
            sender: msg.role === 'user' ? 'user' : 'ai',
            timestamp: msg.timestamp,
            intent: msg.intent,
            metadata: msg.metadata,
            // Add these for compatibility
            id: msg._id.toString(),
            text: msg.content,
            role: msg.role,
            content: msg.content
          })),
          total: messagesArray.length,
          limited: false
        };
      }

    } catch (error) {
      console.error("Error getting chat history:", error);
      return {
        success: false,
        error: error.message,
        messages: []
      };
    }
  }


  static async getUserChatSessions(userId, limit = 20) {
    try {
      const client = await clientPromise;
      const db = client.db();
      const sessions = db.collection("chat_sessions");

      const userSessions = await sessions
        .find({ userId: new ObjectId(userId), isActive: true })  // Fixed: Using the constructor directly
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
        { _id: new ObjectId(sessionId) },  // Fixed: Using the constructor directly
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
          _id: new ObjectId(sessionId),  // Fixed: Using the constructor directly
          userId: new ObjectId(userId)   // Fixed: Using the constructor directly
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
