'use client'

import { MouseEventHandler, useMemo, useTransition } from 'react'

import type { Table } from '@tanstack/react-table'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { DataTableFilterField } from '@/contracts/commons'
import { cn } from '@/lib/utils'

import { DataTableFacetedFilter } from './DataTableFacetedFilter'
import { DataTableViewOptions } from './DataTableViewOptions'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filterFields?: DataTableFilterField<TData>[]
  deleteRowsAction?: MouseEventHandler<HTMLButtonElement>
}

export function DataTableToolbar<TData>({
  table,
  filterFields = [],
  deleteRowsAction,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const [isPending, startTransition] = useTransition()

  const { searchableColumns, filterableColumns } = useMemo(() => {
    return {
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options),
    }
  }, [filterFields])

  return (
    <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.value ? String(column.value) : '') && (
                <Input
                  key={String(column.value)}
                  placeholder={column.placeholder}
                  value={
                    (table
                      .getColumn(String(column.value))
                      ?.getFilterValue() as string) ?? ''
                  }
                  onChange={(event) =>
                    table
                      .getColumn(String(column.value))
                      ?.setFilterValue(event.target.value)
                  }
                  className={cn('h-8 w-44', column.className)}
                />
              ),
          )}
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.value ? String(column.value) : '') && (
                <DataTableFacetedFilter
                  key={String(column.value)}
                  column={table.getColumn(
                    column.value ? String(column.value) : '',
                  )}
                  title={column.label}
                  options={column.options ?? []}
                />
              ),
          )}
        {isFiltered && (
          <Button
            aria-label="Limpar filtros"
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Limpar
            <Icons.x className="ml-2 size-4" aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {deleteRowsAction && table.getSelectedRowModel().rows.length > 0 ? (
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            size="sm"
            className="h-8"
            onClick={(event) => {
              startTransition(() => {
                table.toggleAllPageRowsSelected(false)
                deleteRowsAction(event)
              })
            }}
            disabled={isPending}
          >
            <Icons.trash className="mr-2 size-4" aria-hidden="true" />
            Deletar
          </Button>
        ) : null}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
