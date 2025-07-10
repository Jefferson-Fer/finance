'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { createServerClient } from '@/lib/supabase/server'
import { getURL } from '@/lib/utils'
import * as validators from '@/validators'

import { prisma } from '..'

export const forgotPasswordQuery = async ({
  email,
}: validators.FogotPasswordSchemaType) => {
  const supabase = await createServerClient()

  const url = getURL()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${url}nova-senha`,
  })

  if (error) {
    throw new Error('Erro ao enviar e-mail')
  }

  return { redirectTo: `${url}nova-senha` }
}

export const recoverPasswordQuery = async ({
  newPassword,
  token,
}: validators.RecoverPasswordSchemaType) => {
  const supabase = await createServerClient({ admin: true })
  const redirectTo = '/sign-in'

  const { data: session, error: sessionError } =
    await supabase.auth.exchangeCodeForSession(token)

  if (!session.user) {
    throw new Error(sessionError?.message)
  }

  const { error } = await supabase.auth.admin.updateUserById(session.user.id, {
    password: newPassword,
  })

  if (error) {
    throw new Error('Erro ao atualizar a senha, tente novamente mais tarde')
  }

  return { redirectTo }
}

export const signUpConfirmationQuery = async ({
  pin,
  email,
}: validators.SignUpConfirmationSchemaType) => {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.verifyOtp({
    email,
    token: pin,
    type: 'email',
  })

  if (!user) {
    throw new Error('Erro ao confirmar e-mail')
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  })

  if (!profile) {
    throw new Error('Perfil não encontrado')
  }

  await prisma.profile.update({
    where: {
      id: profile.id,
    },
    data: {
      status: 'ACTIVE',
    },
  })

  revalidatePath('/conta')
  revalidatePath('/odin')

  revalidateTag('profiles_list')
}
