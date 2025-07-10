import { z } from 'zod'

export const signUpSchema = z
  .object({
    email: z.string().email({ message: 'Informe um e-mail válido' }),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
    fullName: z
      .string()
      .min(12, { message: 'O nome completo deve ter no mínimo 12 caracteres' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  })

export type SignUpSchemaType = z.infer<typeof signUpSchema>

export const signUpConfirmationSchema = z.object({
  pin: z.string().min(6, {
    message: 'O PIN deve ter no mínimo 6 caracteres.',
  }),
  email: z.string().email({ message: 'Informe um e-mail válido' }),
})

export type SignUpConfirmationSchemaType = z.infer<
  typeof signUpConfirmationSchema
>

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Informe um e-mail válido' }),
})

export type FogotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>

export const recoverPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
    token: z.string().min(1, { message: 'Informe o token de recuperação' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword'],
  })

export type RecoverPasswordSchemaType = z.infer<typeof recoverPasswordSchema>
