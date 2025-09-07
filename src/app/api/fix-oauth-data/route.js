// Create this file: src/app/api/fix-oauth-data/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({
        success: false,
        error: "Email parameter required"
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    
    // Check current state
    const users = db.collection("users");
    const accounts = db.collection("accounts");
    
    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({
        success: false,
        error: "User not found"
      }, { status: 404 });
    }

    const userAccounts = await accounts.find({ userId: user._id }).toArray();
    
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified
        },
        accounts: userAccounts.map(acc => ({
          id: acc._id.toString(),
          provider: acc.provider,
          providerAccountId: acc.providerAccountId,
          userId: acc.userId.toString()
        }))
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, email } = body;

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");
    const accounts = db.collection("accounts");

    if (action === 'fixGoogleAccount') {
      // Find the user by email
      const user = await users.findOne({ email });
      if (!user) {
        return NextResponse.json({
          success: false,
          error: "User not found"
        }, { status: 404 });
      }

      // Update the user to set emailVerified to current date if it's null
      if (!user.emailVerified) {
        await users.updateOne(
          { _id: user._id },
          { 
            $set: { 
              emailVerified: new Date(),
              updatedAt: new Date()
            }
          }
        );
      }

      // Check if Google account exists
      const googleAccount = await accounts.findOne({
        userId: user._id,
        provider: 'google'
      });

      if (!googleAccount) {
        return NextResponse.json({
          success: false,
          error: "Google account not found for this user"
        });
      }

      return NextResponse.json({
        success: true,
        message: "Account data verified and updated",
        data: {
          userId: user._id.toString(),
          emailVerified: true,
          googleAccountExists: true
        }
      });
    }

    if (action === 'recreateGoogleAccount') {
      // This is a more drastic fix - recreate the account link
      const user = await users.findOne({ email });
      if (!user) {
        return NextResponse.json({
          success: false,
          error: "User not found"
        }, { status: 404 });
      }

      // Delete existing Google account
      await accounts.deleteMany({
        userId: user._id,
        provider: 'google'
      });

      // Create new Google account entry
      const newAccount = {
        userId: user._id,
        provider: 'google',
        type: 'oidc',
        providerAccountId: '116657201610062047056', // Your Google account ID from logs
        access_token: null, // Will be set during next login
        expires_at: null,
        id_token: null,
        refresh_token: null,
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
        token_type: 'bearer'
      };

      const result = await accounts.insertOne(newAccount);

      return NextResponse.json({
        success: true,
        message: "Google account recreated",
        data: {
          accountId: result.insertedId.toString(),
          userId: user._id.toString()
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