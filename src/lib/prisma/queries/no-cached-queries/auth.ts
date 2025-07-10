import { prisma } from '@/lib/prisma'

export const getUserQuery = (userId: string) => {
  return prisma.authUser.findUnique({
    where: {
      id: userId,
    },
  })
}
