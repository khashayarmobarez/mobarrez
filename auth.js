import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin"

export const { handlers, signIn, signOut, auth } = NextAuth({
  // https://console.cloud.google.com/
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  LinkedIn],
});