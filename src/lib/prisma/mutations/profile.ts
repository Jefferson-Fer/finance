import { TypeProfile } from '@prisma/client'

import {
  CreateUserProfilePayload,
  UpdatePerfilProfilePayload,
} from '@/contracts/profile'
import { prisma } from '@/lib/prisma'

export const createUserProfileQuery = async ({
  fullName,
  userId,
}: CreateUserProfilePayload) => {
  return prisma.profile.create({
    data: {
      fullName,
      type: TypeProfile.USER,
      userId,
    },
  })
}

export const updatePerfilProfileQuery = async ({
  fullName,
  id,
}: UpdatePerfilProfilePayload) => {
  return prisma.profile.update({
    where: { id },
    data: { fullName },
  })
}
