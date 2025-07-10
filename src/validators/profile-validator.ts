import { z } from 'zod'

const DEFAULTS = {
  required_error: 'Campo obrigatório!',
  minimo: 'Informe ao mínimo 12 caracteres.',
  minimo10: 'Informe ao mínimo 10 caracteres.',
  email: 'Informe um email válido!',
  password: 'Informe ao mínimo 8 caracteres.',
  cuid: 'ID inválido!',
}

const baseSchema = {
  fullName: z.string({ error: DEFAULTS.required_error }).min(12, {
    message: DEFAULTS.minimo,
  }),
}

export const createProfileSchema = z
  .object({
    ...baseSchema,
    email: z.string({ error: DEFAULTS.required_error }).email({
      message: DEFAULTS.email,
    }),
    password: z.string().min(8, { message: DEFAULTS.password }),
    confirmPassword: z.string().min(8, { message: DEFAULTS.password }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  })

export type CreateProfileSchemaType = z.infer<typeof createProfileSchema>

export const updatePerfilProfileSchema = z.object({
  ...baseSchema,
  email: z.string({ error: DEFAULTS.required_error }).email({
    message: DEFAULTS.email,
  }),
  id: z.string({ error: DEFAULTS.required_error }).cuid({
    message: DEFAULTS.cuid,
  }),
})

export type UpdatePerfilProfileSchemaType = z.infer<
  typeof updatePerfilProfileSchema
>

export const UpdateProfileRequestBackupSchema = z.object({
  id: z.string({ error: DEFAULTS.required_error }).cuid({
    message: DEFAULTS.cuid,
  }),
})

export type UpdateProfileRequestBackupSchemaType = z.infer<
  typeof UpdateProfileRequestBackupSchema
>
