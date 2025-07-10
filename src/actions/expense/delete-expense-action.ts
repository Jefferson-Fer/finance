'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { deleteExpenseQuery } from '@/lib/prisma/mutations/expense'
import { authActionClient } from '@/lib/safe-action'
import { deleteExpenseSchema } from '@/validators'

export const deleteExpenseAction = authActionClient
  .schema(deleteExpenseSchema)
  .metadata({
    name: 'delete expense action',
  })
  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    const revenue = await deleteExpenseQuery(params)

    if (!revenue) {
      throw new Error('Despesa não encontrada')
    }

    revalidatePath('/conta', 'page')

    revalidateTag('expenses_list' + profile.id)
    revalidateTag('assets_all_list' + profile.id)
  })
