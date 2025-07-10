'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useStateAction } from 'next-safe-action/stateful-hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { signInPasswordAction } from '@/actions/auth/signin-action'
import { InputForm } from '@/components/input-form'
import { Button } from '@/components/ui/button/index'
import { ButtonLink } from '@/components/ui/button-link'
import { Form } from '@/components/ui/form'
import { LoadingOnButton } from '@/components/ui/loading'
import { Text } from '@/components/ui/text'
import { loginSchema, LoginSchemaType } from '@/validators'

import { HeaderForm } from '../../_components/header-form'

export default function SigninForm() {
  const router = useRouter()

  const { execute, isPending } = useStateAction(signInPasswordAction, {
    onSuccess: ({ data }) => {
      if (data?.redirectTo) {
        router.push(data.redirectTo)
      }
    },
    onError: () => {
      toast.error('Falha ao logar', {
        description: 'Por favor, verifique suas credenciais',
      })
    },
  })

  const formMethods = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })

  const {
    formState: { isSubmitting, isValid },
  } = formMethods

  return (
    <div className="shadow-lg p-8 rounded-lg">
      <HeaderForm
        title="Faça login"
        description="Preencha o formulário para acessar sua conta."
      />
      <Form {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(execute)}
          className="grid gap-4"
        >
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

          <ButtonLink
            href="/recuperar-senha"
            variant="link"
            size="sm"
            className="justify-self-end underline"
          >
            Esqueceu sua senha?
          </ButtonLink>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !isValid}
          >
            <LoadingOnButton
              isLoading={isPending}
              defaultText="Entrar"
              onActionText="Entrando..."
            />
          </Button>

          <div className="text-center text-sm flex items-center justify-center gap-2">
            <Text variant="body" weight="regular" className="text-gray-600">
              Não tem uma conta?{' '}
            </Text>
            <ButtonLink
              href="/sign-up"
              variant="link"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Inscreva-se
            </ButtonLink>
          </div>
        </form>
      </Form>
    </div>
  )
}
