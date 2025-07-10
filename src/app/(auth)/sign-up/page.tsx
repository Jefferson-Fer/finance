import { Metadata } from 'next'

import { env } from '@/lib/env'

import { SignupForm } from './components/signup-form'

const title = 'Finance | Criar Conta'
const description = 'Preencha o formulário para criar sua conta'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center w-full px-8 h-screen">
      <SignupForm />
    </div>
  )
}
