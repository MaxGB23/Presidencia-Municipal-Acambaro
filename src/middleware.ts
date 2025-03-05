import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/usuarios") && token.permisos !== "Admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (
    pathname.startsWith("/documento-pdf") &&
    token.permisos === "Visualizacion"
  ) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/solicitudes",
    "/estadisticas",
    "/auth/register",
    "/usuarios/:path*", 
    "/documento-pdf/:path*",
  ],
};