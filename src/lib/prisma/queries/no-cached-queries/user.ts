import { prisma } from '@/lib/prisma'

export const getUserByEmailQuery = (email: string) => {
  return prisma.authUser.findFirst({
    where: {
      email,
    },
  })
}
