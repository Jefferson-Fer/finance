import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from 'next-safe-action'
import { z } from 'zod'

import { ProfileAuth } from '@/contracts/profile'
import { createServerClient as createClient } from '@/lib/supabase/server'
import { logger } from '@/lib/utils'

import { prisma } from './prisma'
import { getProfile, getUser } from './prisma/queries/cached-queries'

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
})

export const actionClientWithMeta = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
      track: z
        .object({
          event: z.string(),
          channel: z.string(),
        })
        .optional(),
    })
  },
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  },
})

export const authActionClient = actionClientWithMeta
  .use(async ({ next, clientInput, metadata }) => {
    const result = await next({ ctx: undefined })

    if (process.env.NODE_ENV === 'development') {
      logger('Input ->', clientInput)
      logger('Result ->', result.data)
      logger('Metadata ->', metadata)

      return result
    }

    return result
  })
  .use(async ({ next }) => {
    const user = await getUser()
    const supabase = await createClient({ admin: true })
    let profile: ProfileAuth | null = null

    if (!user) {
      throw new Error('Não autorizado')
    }

    const hasProfile = await getProfile()

    if (!hasProfile) {
      throw new Error('Perfil de usuário não encontrado')
    }

    profile = hasProfile

    return next({
      ctx: {
        supabase,
        //analytics,
        user,
        prisma,
        profile,
      },
    })
  })
