import { prisma } from '@/lib/prisma'
import {
  DeleteExpenseBatchSchemaType,
  DeleteExpenseSchemaType,
  ExpenseSchemaType,
  UpdateExpenseSchemaType,
} from '@/validators'

export const createExpenseQuery = async (
  params: ExpenseSchemaType,
  profileId: string,
) => {
  return await prisma.expense.create({
    data: {
      ...params,
      profileId,
    },
  })
}

export const updateExpenseQuery = async (
  params: UpdateExpenseSchemaType,
  profileId: string,
) => {
  const { id, ...rest } = params

  return await prisma.expense.update({
    data: {
      ...rest,
    },

    where: {
      id,
      profileId,
    },
  })
}

export const deleteExpenseQuery = async (params: DeleteExpenseSchemaType) => {
  return await prisma.expense.delete({
    where: {
      id: params.id,
    },
  })
}

export const deleteExpenseBatchQuery = async (
  params: DeleteExpenseBatchSchemaType,
) => {
  return await prisma.expense.deleteMany({
    where: {
      id: { in: params.ids },
    },
  })
}
