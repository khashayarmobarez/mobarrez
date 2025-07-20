// middleware.js (place in root directory)
import { auth } from "@/auth"

export default auth((req) => {
  // Check if user is authenticated
  if (!req.auth && req.nextUrl.pathname.startsWith('/chat')) {
    // Redirect to login if accessing protected route without authentication
    return Response.redirect(new URL('/auth/login', req.url))
  }
})

export const config = {
  matcher: [
    // Protect these routes
    '/chat/:path*',
    // Add other protected routes here
  ]
}