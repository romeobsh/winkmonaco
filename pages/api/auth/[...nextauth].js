import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const allowedAdminEmails = ["steven.lucas2201@gmail.com", "winkmonaco@gmail.com"]; // Allowed admin email addresses

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
