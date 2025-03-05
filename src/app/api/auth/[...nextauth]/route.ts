import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Correo",
          type: "email",
          placeholder: "Ingresa tu Correo",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "Contraseña",
        }, 
      }, 
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Correo y contraseña son requeridos");
        }

        const userFound = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!userFound) throw new Error("Usuario no encontrado");

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        if (!matchPassword) throw new Error("Contraseña incorrecta");

        return {
          id: userFound.id.toString(),
          name: userFound.name || null,
          lastname: userFound.lastname || null,
          email: userFound.email || null,
          permisos: userFound.permisos || null,
          departamento_id: userFound.departamento_id || null,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.lastname = user.lastname || null;
        token.permisos = user.permisos || null;
        token.departamento_id = user.departamento_id || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id; 
        session.user.lastname = token.lastname || null;
        session.user.permisos = token.permisos || null;
        session.user.departamento_id = token.departamento_id || null;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 30,
    updateAge: 15 * 60,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
