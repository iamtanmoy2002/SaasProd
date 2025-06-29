import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll().map(({ name, value }) => ({
              name,
              value,
            }));
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value);
              response = NextResponse.next({
                request: {
                  headers: request.headers,
                },
              });
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const { data: { user }, error } = await supabase.auth.getUser();

    // Define public routes
    const publicRoutes = [
      "/",
      "/sign-in",
      "/sign-up",
      "/forgot-password",
      "/dashboard/reset-password"
    ];

    // If the route is not public and user is not authenticated, redirect to sign-in
    const isPublic = publicRoutes.some((route) => request.nextUrl.pathname === route);
    const isProtected = !isPublic && !request.nextUrl.pathname.startsWith("/_next") && !request.nextUrl.pathname.match(/\.(svg|png|jpg|jpeg|gif|webp)$/);

    if (isProtected && error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // If user is authenticated but has no user_type, redirect to /role-selector
    if (!error && isProtected && user) {
      // Fetch user profile from Supabase
      const { data: profile } = await supabase
        .from("users")
        .select("user_type")
        .eq("user_id", user.id)
        .single();

      if ((!profile || !profile.user_type) && request.nextUrl.pathname !== "/role-selector") {
        return NextResponse.redirect(new URL("/role-selector", request.url));
      }
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
