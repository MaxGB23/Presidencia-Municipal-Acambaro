export { default } from "next-auth/middleware"

export const config = { matcher: ["/","/dashboard", "/$", "/estadisticas", "/auth/register", "/usuarios/:path*"] }