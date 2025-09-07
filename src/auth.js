import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import clientPromise from "@/lib/db";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

// Create a custom adapter that handles the user ID mismatch
function createFixedAdapter(clientPromise) {
  const baseAdapter = MongoDBAdapter(clientPromise);
  
  return {
    ...baseAdapter,
    
    async getUserByAccount({ providerAccountId, provider }) {
      console.log("=== CUSTOM getUserByAccount ===");
      console.log("Looking for:", { provider, providerAccountId });
      
      try {
        const client = await clientPromise;
        const db = client.db();
        const accounts = db.collection("accounts");
        const users = db.collection("users");

        const account = await accounts.findOne({
          provider,
          providerAccountId
        });

        if (!account) {
          console.log("No account found");
          return null;
        }

        console.log("Found account:", account._id.toString(), "for user:", account.userId.toString());

        const user = await users.findOne({ _id: account.userId });
        
        if (!user) {
          console.log("Account found but user not found");
          return null;
        }

        const result = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
          emailVerified: user.emailVerified || null
        };

        console.log("Returning user:", result);
        return result;
      } catch (error) {
        console.error("Error in getUserByAccount:", error);
        return null;
      }
    },

    async getUserByEmail(email) {
      console.log("=== CUSTOM getUserByEmail ===");
      console.log("Looking for email:", email);
      
      try {
        const client = await clientPromise;
        const db = client.db();
        const users = db.collection("users");

        const user = await users.findOne({ email });
        
        if (!user) {
          console.log("No user found with email");
          return null;
        }

        const result = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image || null,
          emailVerified: user.emailVerified || null
        };

        console.log("Found user by email:", result);
        return result;
      } catch (error) {
        console.error("Error in getUserByEmail:", error);
        return null;
      }
    },

    async linkAccount(account) {
      console.log("=== CUSTOM linkAccount ===");
      console.log("Linking account:", { 
        provider: account.provider, 
        providerAccountId: account.providerAccountId,
        userId: account.userId 
      });
      
      try {
        const client = await clientPromise;
        const db = client.db();
        const accounts = db.collection("accounts");

        // Make sure userId is an ObjectId
        const accountDoc = {
          ...account,
          userId: new ObjectId(account.userId)
        };

        const result = await accounts.insertOne(accountDoc);
        console.log("Account linked successfully:", result.insertedId.toString());
        return accountDoc;
      } catch (error) {
        console.error("Error linking account:", error);
        throw error;
      }
    }
  };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: createFixedAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const client = await clientPromise;
          const db = client.db();
          const users = db.collection("users");

          const user = await users.findOne({ email: credentials.email });

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.AUTH_LINKEDIN_ID,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("=== SIGNIN CALLBACK START ===");
      console.log("User from OAuth:", { 
        id: user.id, 
        email: user.email, 
        name: user.name 
      });
      
      if (account?.provider === "google" || account?.provider === "linkedin") {
        try {
          const client = await clientPromise;
          const db = client.db();
          const users = db.collection("users");
          const accounts = db.collection("accounts");
          
          // Always check by email first to get our database user
          const dbUser = await users.findOne({ email: user.email });
          
          if (dbUser) {
            console.log("Found existing user in database:", dbUser._id.toString());
            
            // Update the user object to use our database user's information
            user.id = dbUser._id.toString();
            user.name = dbUser.name;
            user.email = dbUser.email;
            user.emailVerified = dbUser.emailVerified;
            
            // Check if account already exists
            const existingAccount = await accounts.findOne({
              userId: dbUser._id,
              provider: account.provider,
              providerAccountId: account.providerAccountId
            });
            
            if (existingAccount) {
              console.log("Account already linked, allowing sign-in");
              return true;
            } else {
              console.log("User exists but account not linked, allowing linking");
              return true;
            }
          } else {
            console.log("New user, allowing creation");
            return true;
          }
          
        } catch (error) {
          console.error("Error in OAuth signIn callback:", error);
          return false;
        }
      }
      
      return true;
    },
    
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      
      // Always ensure we have the correct user ID from database
      if (!token.id && token.email) {
        try {
          const client = await clientPromise;
          const db = client.db();
          const users = db.collection("users");
          const dbUser = await users.findOne({ email: token.email });
          
          if (dbUser) {
            token.id = dbUser._id.toString();
            token.name = dbUser.name;
          }
        } catch (error) {
          console.error("Error getting user ID for token:", error);
        }
      }
      
      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log("=== SIGNIN EVENT ===");
      console.log("Sign-in successful:", {
        userId: user.id,
        email: user.email,
        provider: account?.provider,
        isNewUser
      });
    },
    
    async linkAccount({ user, account }) {
      console.log("=== LINK ACCOUNT EVENT ===");
      console.log("Account linked:", {
        userEmail: user.email,
        userId: user.id,
        provider: account.provider
      });
    }
  },
  
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  debug: process.env.NODE_ENV === 'development',
});