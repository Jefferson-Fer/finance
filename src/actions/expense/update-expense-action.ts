'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { updateExpenseQuery } from '@/lib/prisma/mutations/expense'
import { authActionClient } from '@/lib/safe-action'
import { updateExpenseSchema } from '@/validators'

export const updateExpenseAction = authActionClient
  .schema(updateExpenseSchema)
  .metadata({
    name: 'update expense action',
  })
  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    const revenue = await updateExpenseQuery(params, profile.id)

    if (!revenue) {
      throw new Error('Erro ao alterar despesa')
    }

    revalidatePath('/conta', 'page')

    revalidateTag('expenses_list' + profile.id)
    revalidateTag('assets_all_list' + profile.id)
  })
