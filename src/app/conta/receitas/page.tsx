import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import EmptyState from '@/components/empty-state'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SearchParams } from '@/contracts/commons'
import { env } from '@/lib/env'
import {
  getProfile,
  getRevenuesList,
} from '@/lib/prisma/queries/cached-queries'
import { searchRevenuesParse } from '@/lib/utils/search-parses'

import { RevenuesTableShell } from './_components/revenues-shell-table'

const title = 'Finance | Receitas'
const description = 'Gerencie suas receitas'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default async function RevenuesPage(props: {
  searchParams: SearchParams
}) {
  const profile = await getProfile()

  if (!profile) {
    return redirect('/sign-in')
  }

  const parsedParams = await searchRevenuesParse(await props.searchParams)

  const { revenues, count } = await getRevenuesList(profile.id, parsedParams)
  const pageCount = Math.ceil(count / parsedParams.limit)

  return (
    <div className="flex flex-col gap-4">
      {revenues ? (
        <ScrollArea className="size-full">
          <RevenuesTableShell data={revenues} pageCount={pageCount} />
        </ScrollArea>
      ) : (
        <EmptyState
          title="Nenhuma parcela a receber encontrada"
          description="Crie uma parcela a receber para começar a gerenciar suas vendas"
        />
      )}
    </div>
  )
}
