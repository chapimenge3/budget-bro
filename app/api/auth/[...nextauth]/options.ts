import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

import { createUser, getUserByEmail } from "@/lib/user"

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // CredentialsProvider({
    //   name: "credentials",
    //   credentials: {
    //     username: {
    //       label: "Username",
    //       type: "text",
    //       placeholder: "spring-studio",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     // database call
    //     if (
    //       credentials?.username === "admin" &&
    //       credentials?.password === "admin"
    //     ) {
    //       return {
    //         name: "admin",
    //         username: "admin",
    //         id: "1234567890",
    //       };
    //     }
    //     return null;
    //   },
    // }),
  ],
  events: {
    createUser: async (message) => {
      console.log("createUser", message)
    },
    signIn: async (message) => {
      console.log("signIn", message)
      const user = message.user
      if (user.email) {
        const dbUser = await getUserByEmail(user.email)
        if (!dbUser) {
          await createUser(user.name as string, user.email)
        }
      }
    },
  },
}
