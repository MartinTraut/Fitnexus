import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  // Skip auth when Supabase is not configured
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh the Supabase session cookie if present (keeps tokens fresh).
  // NOTE: Route protection is currently handled client-side via the mock
  // auth layer in `lib/auth.ts` (localStorage `fitnexus_user`). We must NOT
  // gate `/dashboard/*` on a Supabase server session here — the demo/mock
  // login never creates one, which would bounce every request back to /login.
  // Re-enable the guard below once auth is migrated to real Supabase Auth.
  await supabase.auth.getUser()

  return supabaseResponse
}
