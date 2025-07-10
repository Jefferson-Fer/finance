import { TypeProfile } from '@prisma/client'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

import { env } from '../env'
import { validatePathByRole } from '../utils'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    env.SUPABASE_URL!,
    env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const paths = {
    signInAccount: '/sign-in',
    signInOdin: '/odin/sign-in',
    private: ['/odin', '/api/', '/conta'],
    guest: ['/recuperar-senha', '/nova-senha'],
    api: ['/api/'],
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isPath = (paths: string[]) =>
    paths.some((path) => request.nextUrl.pathname.startsWith(path))
  const isPrivatePath = isPath(paths.private)
  const isGuestPath = isPath(paths.guest)
  const isApiPath = isPath(paths.api)
  const isSignInPath = isPath([paths.signInAccount, paths.signInOdin])

  const redirects = {
    odin: paths.signInOdin,
    account: paths.signInAccount,
  }

  const atPath = (path: string) => request.nextUrl.pathname.startsWith(path)

  const hasNoUserAndPrivatePath = !user && isPrivatePath
  const hasUserAndGuestPath = !!user && (isGuestPath || isSignInPath)
  const hasUserAndPrivatePath = !!user && isPrivatePath
  const hasUserAndApiPath = !!user && isApiPath

  if (hasUserAndApiPath) {
    return NextResponse.next()
  }

  if (hasUserAndPrivatePath) {
    const { role } = user.user_metadata as { role: TypeProfile }

    const { isValidPath, signInPath } = validatePathByRole(
      request.nextUrl.pathname,
      role,
    )

    if (!isValidPath) {
      await supabase.auth.signOut({
        scope: 'global',
      })
      const url = request.nextUrl.clone()
      url.pathname = signInPath
      return NextResponse.redirect(url)
    }
  }

  if (hasUserAndGuestPath) {
    const { role } = user.user_metadata as {
      role: TypeProfile
    }

    const { dashboardPath } = validatePathByRole(request.nextUrl.pathname, role)

    const url = request.nextUrl.clone()
    url.pathname = dashboardPath
    return NextResponse.redirect(url)
  }

  if (hasNoUserAndPrivatePath && !isSignInPath) {
    if (atPath('/odin')) {
      const url = request.nextUrl.clone()
      url.pathname = redirects.odin
      return NextResponse.redirect(url)
    }

    if (atPath('/conta')) {
      const url = request.nextUrl.clone()
      url.pathname = redirects.account
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
