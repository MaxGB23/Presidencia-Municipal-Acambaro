// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials"; 
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcrypt";



// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {
//           label: "Correo",
//           type: "email",
//           placeholder: "Ingresa tu Correo",
//         },
//         password: {
//           label: "Contraseña",
//           type: "password",
//           placeholder: "Contraseña", 
//         },
//       },
//       async authorize(credentials, req) {
//         console.log(credentials);
//         const userFound = await prisma.user.findUnique({
//           where: {
//             email: credentials.email,
//           }
//         })
//         if (!userFound) throw new Error('Usuario no encontrado')
//         console.log(userFound);
//         const matchPassword = await bcrypt.compare(credentials.password, userFound.password)
//         if (!matchPassword) throw new Error('Contraseña incorrecta')

//         return {
//           id: userFound.id,
//           name: userFound.name,
//           lastname: userFound.lastname,
//           email: userFound.email,
//           permisos: userFound.permisos,
//           departamento_id: userFound.departamento_id
//         }
//     },
//   }),
//   ],
//   pages: {
//     signIn: "/auth/login",
//   }
// };
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST }

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
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
        console.log(credentials);
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
          name: userFound.name,
          lastname: userFound.lastname,
          email: userFound.email,
          permisos: userFound.permisos,
          departamento_id: userFound.departamento_id,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Si hay usuario (primer login), agregar más datos al token
      if (user) {
        token.id = user.id;
        token.lastname = user.lastname;
        token.permisos = user.permisos;
        token.departamento_id = user.departamento_id;
      }
      return token;
    },
    async session({ session, token }) {
      // Agregar datos personalizados a la sesión del usuario
      if (session.user) {
        session.user.id = token.id;
        session.user.lastname = token.lastname;
        session.user.permisos = token.permisos;
        session.user.departamento_id = token.departamento_id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    // refresh page after 30 minutes

    maxAge: 60 * 30
    
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

