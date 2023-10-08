import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

import { createUser, getUserByEmail } from "@/lib/user"

// use adapter to connect to database

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    signIn: async (message) => {
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
