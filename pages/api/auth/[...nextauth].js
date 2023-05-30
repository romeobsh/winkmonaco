import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const allowedAdminEmails = ["steven.lucas2201@gmail.com", "winkmonaco@gmail.com", "thomas.rodier13@gmail.com"]; // Allowed admin email addresses

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
    async signIn({ user, account, profile, email, credentials }) {
      if (allowedAdminEmails.includes(user.email)) {
        return true;
      }
      return false;
    },
  },
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#60C7FA", // Hex color code
    logo: "/icons/ecritures.png", // Absolute URL to image
    buttonText: "", // Hex color code
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
