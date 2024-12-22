import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // eslint-disable-next-line unused-imports/no-unused-vars
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    if (request.nextUrl.pathname.startsWith("/api"))
      response.headers.set("x-user-id", user.id)
  }

  const protectedRoutes = ["/dashboard", "/editor"]

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("redirectedFrom", request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // if (
  //   !user &&
  //   !request.nextUrl.pathname.startsWith("/login") &&
  //   !request.nextUrl.pathname.startsWith("/signup")
  // ) {
  //   // no user, potentially respond by redirecting the user to the login page
  //   const url = request.nextUrl.clone()
  //   url.pathname = "/login"
  //   return NextResponse.redirect(url)
  // }

  return response
}
