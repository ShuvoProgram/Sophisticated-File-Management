import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
