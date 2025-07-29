// src/app/api/debug-auth/route.js
import clientPromise from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    platform: 'vercel',
  };

  try {
    // 1. Check Environment Variables
    debugInfo.envCheck = {
      MONGODB_URI: !!process.env.MONGODB_URI,
      AUTH_SECRET: !!process.env.AUTH_SECRET,
      AUTH_URL: process.env.AUTH_URL,
      GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
      AUTH_LINKEDIN_ID: !!process.env.AUTH_LINKEDIN_ID,
      AUTH_LINKEDIN_SECRET: !!process.env.AUTH_LINKEDIN_SECRET,
    };

    // 2. Test MongoDB Connection
    console.log("Testing MongoDB connection...");
    const client = await clientPromise;
    const db = client.db();
    
    await db.admin().ping();
    debugInfo.mongodb = {
      status: "connected",
      message: "MongoDB connection successful"
    };

    // 3. Test Users Collection
    const users = db.collection("users");
    const userCount = await users.countDocuments();
    debugInfo.mongodb.userCount = userCount;

    // Check if we can read users
    const sampleUser = await users.findOne({}, { 
      projection: { email: 1, name: 1, _id: 1, createdAt: 1 } 
    });
    debugInfo.mongodb.canReadUsers = !!sampleUser;
    debugInfo.mongodb.sampleUserExists = !!sampleUser;

    // 4. Test bcrypt functionality
    try {
      const testPassword = "test123";
      const hashedPassword = await bcrypt.hash(testPassword, 12);
      const isValidPassword = await bcrypt.compare(testPassword, hashedPassword);
      
      debugInfo.bcrypt = {
        canHash: !!hashedPassword,
        canCompare: isValidPassword,
        status: "working"
      };
    } catch (bcryptError) {
      debugInfo.bcrypt = {
        status: "error",
        error: bcryptError.message
      };
    }

    // 5. Test if we can create a test user (we'll delete it after)
    try {
      const testEmail = `test-${Date.now()}@example.com`;
      const testUser = {
        name: "Test User",
        email: testEmail,
        password: await bcrypt.hash("testpass", 12),
        createdAt: new Date(),
        isTestUser: true
      };

      const insertResult = await users.insertOne(testUser);
      debugInfo.userCreation = {
        canInsert: !!insertResult.insertedId,
        insertedId: insertResult.insertedId?.toString()
      };

      // Clean up - delete the test user
      await users.deleteOne({ _id: insertResult.insertedId });
      debugInfo.userCreation.cleanedUp = true;

    } catch (insertError) {
      debugInfo.userCreation = {
        status: "error",
        error: insertError.message
      };
    }

    // 6. Test NextAuth configuration
    debugInfo.nextAuthConfig = {
      hasSecret: !!process.env.AUTH_SECRET,
      secretLength: process.env.AUTH_SECRET?.length || 0,
      urlConfigured: !!process.env.AUTH_URL,
      expectedUrl: "https://mobarrez.com"
    };

    return Response.json({
      success: true,
      debug: debugInfo
    });

  } catch (error) {
    console.error("Debug error:", error);
    
    return Response.json({
      success: false,
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : 'Hidden in production',
        name: error.name
      },
      debug: debugInfo
    }, { status: 500 });
  }
}

// Test POST for signup functionality
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return Response.json({
        success: false,
        error: "Missing required fields",
        received: { email: !!email, password: !!password, name: !!name }
      }, { status: 400 });
    }

    // Test the exact same logic as your signup route
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    // Check if user exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return Response.json({
        success: false,
        error: "User already exists",
        userExists: true
      }, { status: 400 });
    }

    // Test password hashing
    const hashedPassword = await bcrypt.hash(password, 12);

    // Test user creation
    const result = await users.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      isDebugUser: true
    });

    return Response.json({
      success: true,
      message: "Debug signup successful",
      userId: result.insertedId.toString(),
      note: "This was a debug test - user created successfully"
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}