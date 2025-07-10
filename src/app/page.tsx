import { Metadata } from 'next'

import { env } from '@/lib/env'

import LoginPage from './(auth)/sign-in/page'

const title = 'Finance | Home'
const description = 'Gerencie suas finanças'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default function Home() {
  return <LoginPage />
}
