import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/',
  },
})

export const config = {
  // protect route which is matched with the matcher below
  matcher: [
    "/users/:path*",
    "/conversations/:path*",
  ],
}
