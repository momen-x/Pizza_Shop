import Credentials from "next-auth/providers/credentials";
import { type NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";
// import { PrismaAdapter } from '@next-auth/Prisma-adapter';
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // one week
    updateAge: 60 * 60 * 24, // one day
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your@email.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "enter your password",
        },
      },
      authorize: (credentials) => {
        const user = credentials;
        return {
          id: crypto.randomUUID(),
          ...user,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
};
