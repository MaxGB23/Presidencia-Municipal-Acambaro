import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/dashboard/usuarios") && token.permisos !== "Admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (
    pathname.startsWith("/dashboard/documento-pdf") &&
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
    "/dashboard/solicitudes",
    "/dashboard/estadisticas",
    "/auth/register",
    "/dashboard/usuarios/:path*", 
    "/dashboard/documento-pdf/:path*",
  ],
};