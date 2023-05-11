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
  callbacks: {
    signIn: async (user, account, profile) => {
      // Check if the user's email is in the list of allowed email addresses
      if (allowedAdminEmails.includes(user.user.email)) {
        return true;
      }
      return false; // Deny access if the email is not in the list
    },
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
