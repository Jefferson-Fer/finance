import { prisma } from '@/lib/prisma'
import {
  DeleteRevenueBatchSchemaType,
  DeleteRevenueSchemaType,
  RevenueSchemaType,
  UpdateRevenueSchemaType,
} from '@/validators'

export const createRevenueQuery = async (
  params: RevenueSchemaType,
  profileId: string,
) => {
  return await prisma.revenue.create({
    data: {
      ...params,
      profileId,
    },
  })
}

export const updateRevenueQuery = async (
  params: UpdateRevenueSchemaType,
  profileId: string,
) => {
  const { id, ...rest } = params

  return await prisma.revenue.update({
    data: {
      ...rest,
    },

    where: {
      id,
      profileId,
    },
  })
}

export const deleteRevenueQuery = async (params: DeleteRevenueSchemaType) => {
  return await prisma.revenue.delete({
    where: {
      id: params.id,
    },
  })
}

export const deleteRevenueBatchQuery = async (
  params: DeleteRevenueBatchSchemaType,
) => {
  return await prisma.revenue.deleteMany({
    where: {
      id: { in: params.ids },
    },
  })
}
