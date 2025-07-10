'use server'

import { createServerClient as createServerClientSSR } from '@supabase/ssr'
import { cookies } from 'next/headers'

import { env } from '@/lib/env'

type CreateClientOptions = {
  admin?: boolean
  schema?: 'public'
}

export const createServerClient = async (options?: CreateClientOptions) => {
  const { admin = false, ...rest } = options || {}

  const cookieStore = await cookies()

  const key = admin ? env.SUPABASE_SERVICE_ROLE_KEY! : env.SUPABASE_ANON_KEY!

  const auth = admin
    ? {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      }
    : {}

  return createServerClientSSR(env.SUPABASE_URL, key, {
    db: {
      schema: rest.schema,
    },
    auth,
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch (error) {
          console.error(error)
        }
      },
    },
  })
}
