import { DataTableLoading } from '@/components/ui/data-table/DataTableLoading'

export default async function ExpenseLoading() {
  return (
    <div className="flex flex-col gap-4">
      <DataTableLoading columnCount={5} />
    </div>
  )
}
