'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { updateRevenueQuery } from '@/lib/prisma/mutations'
import { authActionClient } from '@/lib/safe-action'
import { updateRevenueSchema } from '@/validators/revenue-validator'

export const updateRevenueAction = authActionClient
  .schema(updateRevenueSchema)
  .metadata({
    name: 'update revenue action',
  })
  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    const revenue = await updateRevenueQuery(params, profile.id)

    if (!revenue) {
      throw new Error('Erro ao alterar receita')
    }

    revalidatePath('/conta', 'page')

    revalidateTag('revenues_list' + profile.id)
    revalidateTag('assets_all_list' + profile.id)
  })
