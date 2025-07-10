import { Revenue, TypePayment } from '@prisma/client'

import { FindGenericList } from './commons'

export type RevenueFields = keyof Revenue

export type FindRevenueFields = FindGenericList<RevenueFields> & {
  type_payment?: string
}

export type RevenueWithCounts = Revenue

export type RevenueType = {
  name: string
  id: string
  description: string
  value: number
  date_payment: Date | null
  type_payment: TypePayment
  createdAt: Date
  updatedAt: Date
  profileId: string | null
}[]
