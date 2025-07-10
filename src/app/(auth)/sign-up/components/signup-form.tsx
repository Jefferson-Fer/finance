'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useStateAction } from 'next-safe-action/stateful-hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { signUpProfileAction } from '@/actions/auth/signup-action'
import { InputForm } from '@/components/input-form'
import { Button } from '@/components/ui/button'
import { ButtonLink } from '@/components/ui/button-link'
import { Form } from '@/components/ui/form'
import { LoadingOnButton } from '@/components/ui/loading'
import { Text } from '@/components/ui/text'
import { signUpSchema, SignUpSchemaType } from '@/validators/signup-validator'

import { HeaderForm } from '../../_components/header-form'

export function SignupForm() {
  const { execute, isPending } = useStateAction(signUpProfileAction, {
    onSuccess: ({ data }) => {
      if (data?.redirectTo) {
        toast.success('Cadastro realizado com sucesso', {
          description:
            'Você receberá um e-mail com as instruções para acessar o sistema.',
        })
        formMethods.reset()
      }
    },
    onError: ({ error }) => {
      toast.error('Erro', {
        description: error?.serverError ?? 'Ocorreu um erro ao cadastrar',
      })

      reset()
    },
  })

  const formMethods = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  })

  const {
    reset,
    formState: { isSubmitting, isValid },
  } = formMethods

  return (
    <div className="shadow-lg p-8 rounded-lg">
      <HeaderForm
        title="Criar Conta"
        description="Preencha o formulário para criar sua conta"
      />
      <Form {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(execute)}
          className="space-y-4 pt-4"
        >
          <InputForm
            name="fullName"
            label="Nome Completo"
            type="text"
            placeholder="ex: Jhon Doe"
          />

          <InputForm
            name="email"
            label="E-mail"
            type="email"
            placeholder="meu@email.com"
          />

          <InputForm
            name="password"
            label="Senha"
            type="password"
            placeholder="****"
            toogleView
          />

          <InputForm
            name="confirmPassword"
            label="Confirmar Senha"
            type="password"
            placeholder="****"
            toogleView
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !isValid}
          >
            <LoadingOnButton
              isLoading={isPending}
              defaultText="Criar Conta"
              onActionText="Criando conta..."
            />
          </Button>

          <div className="text-center text-sm flex items-center justify-center gap-2">
            <Text variant="body" weight="regular" className="text-gray-600">
              Já tem uma conta?{' '}
            </Text>
            <ButtonLink
              href="/sign-in"
              variant="link"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Fazer login
            </ButtonLink>
          </div>
        </form>
      </Form>
    </div>
  )
}
