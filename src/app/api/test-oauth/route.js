import { NextResponse } from "next/server";
import { auth } from "@/auth";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    // Check current session
    const session = await auth();
    
    const result = {
      timestamp: new Date().toISOString(),
      session: session ? {
        user: {
          id: session.user?.id,
          email: session.user?.email,
          name: session.user?.name
        },
        expires: session.expires
      } : null,
      sessionStatus: session ? 'authenticated' : 'not authenticated'
    };

    // If we have a session, get additional details from database
    if (session?.user?.id) {
      const client = await clientPromise;
      const db = client.db();
      
      const users = db.collection("users");
      const accounts = db.collection("accounts");
      
      // Get user details
      try {
        const user = await users.findOne({ _id: new ObjectId(session.user.id) });
        result.databaseUser = user ? {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt
        } : null;
      } catch (userError) {
        result.databaseUser = { error: userError.message };
      }
      
      // Get user's accounts
      try {
        const userAccounts = await accounts.find({ userId: new ObjectId(session.user.id) }).toArray();
        result.userAccounts = userAccounts.map(acc => ({
          provider: acc.provider,
          type: acc.type,
          providerAccountId: acc.providerAccountId,
          createdAt: acc.createdAt || 'No timestamp'
        }));
      } catch (accountError) {
        result.userAccounts = { error: accountError.message };
      }
    } else if (session?.user?.email) {
      // If we have an email but no ID, try to find the user by email
      const client = await clientPromise;
      const db = client.db();
      const users = db.collection("users");
      
      try {
        const user = await users.findOne({ email: session.user.email });
        result.userByEmail = user ? {
          id: user._id.toString(),
          email: user.email,
          name: user.name
        } : null;
      } catch (emailError) {
        result.userByEmail = { error: emailError.message };
      }
    }

    return NextResponse.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error("Test OAuth error:", error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

// POST method for additional testing
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, email } = body;

    const client = await clientPromise;
    const db = client.db();

    if (action === 'checkUser') {
      const users = db.collection("users");
      const accounts = db.collection("accounts");
      
      const user = await users.findOne({ email });
      let userAccounts = [];
      
      if (user) {
        userAccounts = await accounts.find({ userId: user._id }).toArray();
      }

      return NextResponse.json({
        success: true,
        data: {
          user: user ? {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            emailVerified: user.emailVerified,
            createdAt: user.createdAt
          } : null,
          accounts: userAccounts.map(acc => ({
            provider: acc.provider,
            type: acc.type,
            providerAccountId: acc.providerAccountId
          }))
        }
      });
    }

    return NextResponse.json({
      success: false,
      error: "Invalid action"
    }, { status: 400 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}