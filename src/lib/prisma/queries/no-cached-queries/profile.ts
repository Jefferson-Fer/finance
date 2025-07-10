import { AuthUser } from '@prisma/client'

import { FindProfilesList, ProfileAuth } from '@/contracts/profile'
import { prisma } from '@/lib/prisma'

export const getProfileQuery = async (
  user: AuthUser,
): Promise<ProfileAuth | null> => {
  const profile = await prisma.profile.findFirst({
    select: {
      id: true,
      fullName: true,
      type: true,
      status: true,
    },
    where: {
      userId: user.id,
    },
  })

  if (!profile) {
    return null
  }

  const userMetadata = user.raw_user_meta_data as {
    avatar_url?: string
  }

  return {
    id: profile.id,
    fullName: profile.fullName,
    email: user.email!,
    image: userMetadata.avatar_url,
    role: profile.type,
    preferences: {},
  }
}

export const getProfileListQuery = async ({
  limit,
  offset,
  column = 'createdAt',
  fromDay,
  order = 'desc',
  search,
  toDay,
}: FindProfilesList) => {
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

  const profiles = await prisma.profile.findMany({
    where: {
      fullName: search ? { contains: search } : undefined,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
    take: limit,
    skip: offset,
  })

  const count = await prisma.profile.count({
    where: {
      fullName: search ? { contains: search } : undefined,
      createdAt: dayFilter,
    },
    orderBy: orderFilter,
  })

  return { profiles, count }
}
