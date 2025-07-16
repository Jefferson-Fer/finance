import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import EmptyState from '@/components/empty-state'
import { ScrollArea } from '@/components/ui/scroll-area'
import { env } from '@/lib/env'
import {
  getAssetsAllList,
  getProfile,
} from '@/lib/prisma/queries/cached-queries'

import CardsInfo from './_components/cards'

const title = 'Finance | Conta'
const description = 'Gerencie suas finanças'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default async function DashboardPage() {
  const profile = await getProfile()

  if (!profile) {
    return redirect('/sign-in')
  }

  const { revenues, expenses } = await getAssetsAllList(profile.id)

  return (
    <div className="flex flex-col gap-4">
      {expenses.length > 0 || revenues.length > 0 ? (
        <ScrollArea className="size-full">
          <CardsInfo revenues={revenues} expenses={expenses} />
        </ScrollArea>
      ) : (
        <EmptyState
          title="Nenhuma receita ou despesa encontrada"
          description="Adicione uma receita ou despesa para visualizar suas informações"
        />
      )}
    </div>
  )
}
