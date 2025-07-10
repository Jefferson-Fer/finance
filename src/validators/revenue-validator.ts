import { z } from 'zod'

const DEFAULTS = {
  minValue: 'O valor deve ser maior que 0',
  required: 'O campo é obrigatório',
  invalidID: 'ID do cliente inválido',
}

export const revenueSchema = z.object({
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

export type RevenueSchemaType = z.infer<typeof revenueSchema>

export const updateRevenueSchema = z.object({
  ...revenueSchema.shape,
  id: z.string().cuid({ message: DEFAULTS.invalidID }),
})

export type UpdateRevenueSchemaType = z.infer<typeof updateRevenueSchema>

export const deleteRevenueSchema = z.object({
  id: z.string().cuid({ message: DEFAULTS.invalidID }),
})

export type DeleteRevenueSchemaType = z.infer<typeof deleteRevenueSchema>

export const deleteRevenueBatchSchema = z.object({
  ids: z.array(
    z.string().cuid({
      message: DEFAULTS.invalidID,
    }),
  ),
})

export type DeleteRevenueBatchSchemaType = z.infer<
  typeof deleteRevenueBatchSchema
>
