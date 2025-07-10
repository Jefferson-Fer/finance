'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { deleteRevenueQuery } from '@/lib/prisma/mutations'
import { authActionClient } from '@/lib/safe-action'
import { deleteRevenueSchema } from '@/validators/revenue-validator'

export const deleteRevenueAction = authActionClient
  .schema(deleteRevenueSchema)
  .metadata({
    name: 'delete revenue action',
  })
  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    const revenue = await deleteRevenueQuery(params)

    if (!revenue) {
      throw new Error('Receita não encontrada')
    }

    revalidatePath('/conta', 'page')

    revalidateTag('revenues_list' + profile.id)
    revalidateTag('assets_all_list' + profile.id)
  })
