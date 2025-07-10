'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { deleteExpenseBatchQuery } from '@/lib/prisma/mutations/expense'
import { authActionClient } from '@/lib/safe-action'
import { deleteExpenseBatchSchema } from '@/validators'

export const deleteExpenseBatchAction = authActionClient
  .schema(deleteExpenseBatchSchema)
  .metadata({
    name: 'delete expense batch action',
  })
  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    const charges = await deleteExpenseBatchQuery(params)

    if (!charges) {
      throw new Error('Despesas não encontradas')
    }

    revalidatePath('/conta', 'page')

    revalidateTag('expenses_list' + profile.id)
    revalidateTag('assets_all_list' + profile.id)
  })
