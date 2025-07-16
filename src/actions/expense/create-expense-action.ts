'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { createExpenseQuery } from '@/lib/prisma/mutations/expense'
import { authActionClient } from '@/lib/safe-action'
import { expenseSchema } from '@/validators'

export const createExpenseAction = authActionClient
  .schema(expenseSchema)
  .metadata({
    name: 'create expense action',
  })
  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    const revenue = await createExpenseQuery(params, profile.id)

    if (!revenue) {
      throw new Error('Erro ao criar despesa')
    }

    revalidatePath('/conta', 'layout')

    revalidateTag('expenses_list' + profile.id)
    revalidateTag('assets_all_list' + profile.id)
  })
