import { prisma } from '@/lib/prisma'

export const getAssetsAllListQuery = async (profileId: string) => {
  const revenues = await prisma.revenue.findMany({
    where: {
      profileId,
    },
  })

  const expenses = await prisma.expense.findMany({
    where: {
      profileId,
    },
  })

  return { revenues, expenses }
}
