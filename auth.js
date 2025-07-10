import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin"

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  // https://console.cloud.google.com/
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  LinkedIn],
});