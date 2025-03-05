import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Extiende la interfaz `Session` para incluir propiedades personalizadas.
   */
  interface Session {
    user: {
      id: string ;
      lastname?: string | null;
      permisos?: string | null;
      departamento_id?: string | null;
    } & DefaultSession["user"]; // Mantén las propiedades por defecto de `user`
  }

  /**
   * Extiende la interfaz `User` para incluir propiedades personalizadas.
   */
  interface User extends DefaultUser {
    id: string;
    lastname?: string | null;
    permisos?: string | null;
    departamento_id?: string | null;
  }
}

declare module "next-auth/jwt" {
  /**
   * Extiende la interfaz `JWT` para incluir propiedades personalizadas.
   */
  interface JWT {
    id: string;
    lastname?: string | null;
    permisos?: string | null;
    departamento_id?: string | null;
  }
}
