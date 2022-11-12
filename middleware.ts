import { withAuth } from 'next-auth/middleware';


export const config = {
    matcher: ['/', '/((?!api/).*)'],
}
const publicFileRegex = /\.(.*)$/;
const anonymousRoutes = ['/', '/demo/profil']; // The whitelisted routes

export default withAuth({
    callbacks: {
        authorized: async ( {req} ) => {
            const { pathname } = req.nextUrl;

            return Boolean(
                req.cookies.get('next-auth.session-token') || // check if there's a token
                    pathname.startsWith('/_next') || // exclude Next.js internals
                    pathname.startsWith('/api') || //  exclude all API routes
                    pathname.startsWith('/static') || // exclude static files
                    publicFileRegex.test(pathname) || // exclude all files in the public folder
                    anonymousRoutes.includes(pathname)
            );
            // return true;
        },
    },
    // If you have custom pages like I do, these should be whitelisted!
    pages: {
        signIn: '/',
    },
});