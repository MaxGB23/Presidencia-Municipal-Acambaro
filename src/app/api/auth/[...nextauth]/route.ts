import NextAuth from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma)
  providers: [
    CredentialsProvider({
      name: "credentials",   
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Nombre de Usuario" },
        password: { label: "Password", type: "password" }
      }   
      async authorize(credentials) {
      }
    })

  ],
};
// const handler = NextAuth({
//   ...
// })

// export { handler as GET, handler as POST }
