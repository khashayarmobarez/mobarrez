import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";
import LinkedIn from "@auth/core/providers/linkedin";
import Credentials from "@auth/core/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "@/lib/db";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    LinkedIn({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await adapter.getUserByEmail(credentials.email);
          if (!user || !user.password) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    // Remove signUp from pages - NextAuth doesn't have a signUp page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  // Add debug mode for development
  debug: process.env.NODE_ENV === "development",
  // Add secret for production
  secret: process.env.NEXTAUTH_SECRET,
});