import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Informe um e-mail válido' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
})

export type LoginSchemaType = z.infer<typeof loginSchema>
