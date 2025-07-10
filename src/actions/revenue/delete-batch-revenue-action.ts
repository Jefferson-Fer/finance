'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

import { deleteRevenueBatchQuery } from '@/lib/prisma/mutations'
import { authActionClient } from '@/lib/safe-action'
import { deleteRevenueBatchSchema } from '@/validators/revenue-validator'

export const deleteRevenueBatchAction = authActionClient
  .schema(deleteRevenueBatchSchema)
  .metadata({
    name: 'delete revenue batch action',
  })
  .stateAction(async ({ parsedInput: params, ctx: { profile } }) => {
    if (!profile) {
      throw new Error('Usuário não encontrado')
    }

    const charges = await deleteRevenueBatchQuery(params)

    if (!charges) {
      throw new Error('Receitas não encontradas')
    }

    revalidatePath('/conta', 'page')

    revalidateTag('revenues_list' + profile.id)
    revalidateTag('assets_all_list' + profile.id)
  })
