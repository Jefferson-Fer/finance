import { Metadata } from 'next'

import { env } from '@/lib/env'

import SigninForm from './components/signin-form'

const title = 'Finance | Login'
const description = 'Faça login para continuar'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center w-full px-8 h-screen">
      <SigninForm />
    </div>
  )
}
