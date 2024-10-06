import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes (in this case, only the home page)
const isPublicRoute = createRouteMatcher(["/"]);

// Use clerkMiddleware to protect routes
export default clerkMiddleware((auth, request) => {
  // If the request is not a public route, protect it
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

// Middleware configuration to match all routes except static files and Next.js internals
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
