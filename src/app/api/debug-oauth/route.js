// Create this file: src/app/api/debug-oauth/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email'); // Pass the email you're testing with

    const client = await clientPromise;
    const db = client.db();
    
    const debug = {
      timestamp: new Date().toISOString(),
      email: email || "No email provided - add ?email=your@email.com to URL"
    };

    // 1. Check users collection
    const users = db.collection("users");
    const usersByEmail = await users.find({ email }).toArray();
    debug.users = {
      count: usersByEmail.length,
      users: usersByEmail.map(u => ({
        id: u._id.toString(),
        email: u.email,
        name: u.name,
        createdAt: u.createdAt,
        hasPassword: !!u.password,
        emailVerified: u.emailVerified || null
      }))
    };

    // 2. Check accounts collection (NextAuth's OAuth accounts)
    const accounts = db.collection("accounts");
    const allAccounts = await accounts.find({}).toArray();
    const accountsByEmail = [];
    
    // Find accounts that belong to users with this email
    for (const user of usersByEmail) {
      const userAccounts = await accounts.find({ userId: user._id }).toArray();
      accountsByEmail.push(...userAccounts);
    }

    debug.accounts = {
      totalAccounts: allAccounts.length,
      accountsForThisEmail: accountsByEmail.map(a => ({
        id: a._id.toString(),
        userId: a.userId.toString(),
        provider: a.provider,
        providerAccountId: a.providerAccountId,
        type: a.type,
        createdAt: a.createdAt || "No timestamp"
      }))
    };

    // 3. Check sessions collection
    const sessions = db.collection("sessions");
    const allSessions = await sessions.find({}).toArray();
    debug.sessions = {
      totalSessions: allSessions.length,
      recentSessions: allSessions.slice(-5).map(s => ({
        userId: s.userId?.toString(),
        expires: s.expires,
        sessionToken: s.sessionToken ? "***exists***" : null
      }))
    };

    // 4. Check verification tokens
    const verificationTokens = db.collection("verification_tokens");
    const tokens = await verificationTokens.find({}).toArray();
    debug.verificationTokens = {
      count: tokens.length
    };

    // 5. Environment check
    debug.environment = {
      NODE_ENV: process.env.NODE_ENV,
      hasGoogleCredentials: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
      hasLinkedInCredentials: !!(process.env.AUTH_LINKEDIN_ID && process.env.AUTH_LINKEDIN_SECRET),
      authUrl: process.env.AUTH_URL,
      authSecret: !!process.env.AUTH_SECRET
    };

    // 6. Collections info
    const collections = await db.listCollections().toArray();
    debug.database = {
      collections: collections.map(c => c.name)
    };

    return NextResponse.json({
      success: true,
      debug
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}

// POST method to clean up accounts for testing
export async function POST(request) {
  try {
    const body = await request.json();
    const { action, email } = body;

    if (!email) {
      return NextResponse.json({
        success: false,
        error: "Email is required"
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    if (action === 'cleanup') {
      // Find all users with this email
      const users = db.collection("users");
      const accounts = db.collection("accounts");
      const sessions = db.collection("sessions");

      const userDocs = await users.find({ email }).toArray();
      
      let deletedCount = {
        users: 0,
        accounts: 0,
        sessions: 0
      };

      for (const user of userDocs) {
        // Delete associated accounts
        const accountResult = await accounts.deleteMany({ userId: user._id });
        deletedCount.accounts += accountResult.deletedCount;

        // Delete associated sessions
        const sessionResult = await sessions.deleteMany({ userId: user._id });
        deletedCount.sessions += sessionResult.deletedCount;
      }

      // Delete users
      const userResult = await users.deleteMany({ email });
      deletedCount.users = userResult.deletedCount;

      return NextResponse.json({
        success: true,
        message: `Cleaned up data for ${email}`,
        deletedCount
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