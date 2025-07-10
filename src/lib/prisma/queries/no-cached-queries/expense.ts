import { FindExpenseFields } from '@/contracts/expense'
import { prisma } from '@/lib/prisma'

export const getExpensesListQuery = async (
  profileId: string,
  {
    limit,
    offset,
    column = 'createdAt',
    fromDay,
    order = 'desc',
    search,
    toDay,
    type_payment,
  }: FindExpenseFields,
) => {
  const dayFilter =
    fromDay && toDay
      ? {
          gte: fromDay,
          lte: toDay,
        }
      : undefined

  const orderFilter =
    column && order
      ? {
          [column]: order,
        }
      : undefined

  const typePaymentFilter = type_payment
    ? {
        in: type_payment
          .split('.')
          .map(
            (type_payment) =>
              type_payment as
                | 'PIX'
                | 'MONEY'
                | 'CREDIT_CARD'
                | 'TICKET'
                | undefined,
          ),
      }
    : undefined

  const expenses = await prisma.expense.findMany({
    where: {
      name: search ? { contains: search, mode: 'insensitive' } : undefined,
      type_payment:
        typePaymentFilter && typePaymentFilter.in
          ? { in: typePaymentFilter.in.filter((v) => v !== undefined) }
          : undefined,
      createdAt: dayFilter,
      profileId: profileId,
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.expense.count({
    where: {
      name: search ? { contains: search, mode: 'insensitive' } : undefined,
      type_payment:
        typePaymentFilter && typePaymentFilter.in
          ? { in: typePaymentFilter.in.filter((v) => v !== undefined) }
          : undefined,
      createdAt: dayFilter,
      profileId: profileId,
    },
    orderBy: orderFilter,
  })

  return { expenses, count }
}
