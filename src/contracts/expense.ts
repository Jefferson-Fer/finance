import { Expense, TypePayment } from '@prisma/client'

import { FindGenericList } from './commons'

export type ExpenseFields = keyof Expense

export type FindExpenseFields = FindGenericList<ExpenseFields> & {
  type_payment?: string
}

export type ExpenseWithCounts = Expense

export type ExpenseType = {
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
