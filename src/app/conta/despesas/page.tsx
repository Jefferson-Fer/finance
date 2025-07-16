import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import EmptyState from '@/components/empty-state'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SearchParams } from '@/contracts/commons'
import { env } from '@/lib/env'
import {
  getExpensesList,
  getProfile,
} from '@/lib/prisma/queries/cached-queries'
import { searchExpensesParse } from '@/lib/utils/search-parses'

import { ExpensesTableShell } from './_components/expenses-shell-table'

const title = 'Finance | Despesas'
const description = 'Gerencie suas despesas'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title,
  description,
}

export default async function SaidasPage(props: {
  searchParams: SearchParams
}) {
  const profile = await getProfile()

  if (!profile) {
    return redirect('/sign-in')
  }

  const parsedParams = await searchExpensesParse(await props.searchParams)

  const { expenses, count } = await getExpensesList(profile.id, parsedParams)
  const pageCount = Math.ceil(count / parsedParams.limit)

  return (
    <div className="flex flex-col gap-4">
      {expenses ? (
        <ScrollArea className="size-full">
          <ExpensesTableShell data={expenses} pageCount={pageCount} />
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
