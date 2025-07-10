import { z } from 'zod'

const DEFAULTS = {
  minValue: 'O valor deve ser maior que 0',
  required: 'O campo é obrigatório',
  invalidID: 'ID do cliente inválido',
}

export const expenseSchema = z.object({
  name: z.string().min(1, { message: DEFAULTS.required }),
  description: z.string().min(1, { message: DEFAULTS.required }),
  value: z.coerce.number().min(1, { message: DEFAULTS.minValue }),
  date_payment: z
    .date({
      error: 'A data de vencimento é obrigatória',
    })
    .optional(),
  type_payment: z
    .enum(['PIX', 'MONEY', 'CREDIT_CARD', 'TICKET'], {
      message: 'Tipo inválido',
    })
    .optional(),
})

export type ExpenseSchemaType = z.infer<typeof expenseSchema>

export const updateExpenseSchema = z.object({
  ...expenseSchema.shape,
  id: z.string().cuid({ message: DEFAULTS.invalidID }),
})

export type UpdateExpenseSchemaType = z.infer<typeof updateExpenseSchema>

export const deleteExpenseSchema = z.object({
  id: z.string().cuid({ message: DEFAULTS.invalidID }),
})

export type DeleteExpenseSchemaType = z.infer<typeof deleteExpenseSchema>

export const deleteExpenseBatchSchema = z.object({
  ids: z.array(
    z.string().cuid({
      message: DEFAULTS.invalidID,
    }),
  ),
})

export type DeleteExpenseBatchSchemaType = z.infer<
  typeof deleteExpenseBatchSchema
>
