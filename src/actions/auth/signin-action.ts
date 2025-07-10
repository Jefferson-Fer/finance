'use server'

import { TypeProfile } from '@prisma/client'

import { actionClientWithMeta } from '@/lib/safe-action'
import { createServerClient } from '@/lib/supabase/server'
import { loginSchema } from '@/validators'

export const signInPasswordAction = actionClientWithMeta
  .schema(loginSchema)
  .metadata({
    name: 'signInPasswordAction',
  })
  .stateAction(async ({ parsedInput: params }) => {
    const supabase = await createServerClient()

    const { error, data } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    })

    if (error || !data.user || !data.user.email_confirmed_at) {
      throw new Error('Erro ao tentar entrar. Verifique suas credenciais.')
    }

    return data.user.user_metadata.role === TypeProfile.USER
      ? {
          redirectTo: '/conta/dashboard',
        }
      : {
          redirectTo: '/odin',
        }
  })
