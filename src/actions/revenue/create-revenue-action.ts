'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { createRevenueQuery } from '@/lib/prisma/mutations'
import { authActionClient } from '@/lib/safe-action'
import { revenueSchema } from '@/validators/revenue-validator'

export const createRevenueAction = authActionClient
  .schema(revenueSchema)
  .metadata({
    name: 'create revenue action',
  })
  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    const revenue = await createRevenueQuery(params, profile.id)

    if (!revenue) {
      throw new Error('Erro ao criar receita')
    }

    revalidatePath('/conta', 'page')

    revalidateTag('revenues_list' + profile.id)
    revalidateTag('assets_all_list' + profile.id)
  })
