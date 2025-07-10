'use client'

import { useCallback, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import type { ColumnDef } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { useStateAction } from 'next-safe-action/stateful-hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { deleteExpenseBatchAction } from '@/actions/expense/delete-batch-expense-action'
import { deleteExpenseAction } from '@/actions/expense/delete-expense-action'
import { updateExpenseAction } from '@/actions/expense/update-expense-action'
import { Icons } from '@/components/icons'
import { InputForm } from '@/components/input-form'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import { DataTable } from '@/components/ui/data-table'
import { DataTableColumnHeader } from '@/components/ui/data-table/DataTableColumnHeader'
import { DatePickerSingle } from '@/components/ui/date-picker-single'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import InputCurrency from '@/components/ui/input-currency'
import { LoadingOnButton } from '@/components/ui/loading'
import { SearchPopover } from '@/components/ui/search-popover'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Text } from '@/components/ui/text'
import { Textarea } from '@/components/ui/textarea'
import { paymentMethodsList } from '@/config/constants'
import { ExpenseWithCounts } from '@/contracts/expense'
import { RevenueWithCounts } from '@/contracts/revenue'
import { formatDate, formatMoney, niceDate } from '@/lib/utils'
import { updateExpenseSchema, UpdateExpenseSchemaType } from '@/validators'

interface ExpensesTableShellProps {
  data: ExpenseWithCounts[]
  pageCount: number
}

interface SelectedRowType {
  id: string
  enabled: boolean
}

export interface FilterOptions {
  name: string
  status: string | null
}

export function ExpensesTableShell({
  data,
  pageCount,
}: ExpensesTableShellProps) {
  const [selectedRowIds, setSelectedRowIds] = useState<SelectedRowType[]>([])
  const [selectedExpense, setSelectedExpense] =
    useState<ExpenseWithCounts | null>(null)
  const [isDeleteItem, setIsDeleteItem] = useState(false)
  const [confirmBatchDelete, setConfirmBatchDelete] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)

  const [searchPaymentMethod, setSearchPaymentMethod] = useState('')

  const { execute, isPending } = useStateAction(updateExpenseAction, {
    onSuccess: () => {
      toast.success('Despesa atualizada com sucesso')
      reset()
      setIsUpdateDialogOpen(false)
    },

    onError: ({ error }) => {
      toast.error('Erro ao atualizar despesa', {
        description: error.serverError,
      })
      reset()
      setIsUpdateDialogOpen(false)
    },
  })

  const { execute: executeDelete, isPending: isPendingDelete } = useStateAction(
    deleteExpenseAction,
    {
      onSuccess: () => {
        toast.success('Despesa deletada com sucesso')
        setSelectedExpense(null)
      },

      onError: ({ error }) => {
        toast.error('Erro ao deletar despesa', {
          description: error.serverError,
        })
        setSelectedExpense(null)
      },
    },
  )

  const { execute: executeDeleteBatch, isPending: isPendingDeleteBatch } =
    useStateAction(deleteExpenseBatchAction, {
      onSuccess: () => {
        toast.success('Despesas deletadas com sucesso')
        setConfirmBatchDelete(false)
      },
      onError: ({ error }) => {
        toast.error('Erro ao deletar despesas', {
          description: error.serverError,
        })
        setConfirmBatchDelete(false)
      },
    })

  const formMethods = useForm<UpdateExpenseSchemaType>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(updateExpenseSchema) as any,
  })

  const { setValue, reset } = formMethods

  const handleDeleteExpense = useCallback(() => {
    if (selectedExpense) {
      executeDelete({ id: selectedExpense.id })
    }
  }, [executeDelete, selectedExpense])

  const onUpdate = useCallback(
    (revenue: RevenueWithCounts) => {
      setValue('id', revenue.id ?? '')
      setValue('name', revenue.name ?? '')
      setValue('description', revenue.description ?? '')
      setValue(
        'date_payment',
        revenue.date_payment
          ? niceDate(revenue.date_payment.toString())
          : new Date(),
      )
      setValue('value', revenue.value ?? 0)
      setValue('type_payment', revenue.type_payment ?? 'PIX')
      setSearchPaymentMethod(revenue.type_payment ?? 'PIX')
    },
    [setValue],
  )

  const columns = useMemo<ColumnDef<RevenueWithCounts, unknown>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value)
              setSelectedRowIds((prev) =>
                prev.length === data.length
                  ? []
                  : data.map((row) => {
                      return {
                        enabled: true,
                        id: row.id,
                      }
                    }),
              )
            }}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
              setSelectedRowIds((prev) =>
                value
                  ? [
                      ...prev,
                      {
                        id: row.original.id,
                        enabled: true,
                      },
                    ]
                  : prev.filter((item) => item.id !== row.original.id),
              )
            }}
            aria-label="Select row"
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Descrição" />
        ),
        cell: ({ row }) => {
          const { name } = row.original

          return <Text>{name}</Text>
        },
      },

      {
        accessorKey: 'value',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Valor" />
        ),
        cell: ({ row }) => {
          const { value } = row.original

          return <Text>{formatMoney(value)}</Text>
        },
      },

      {
        accessorKey: 'date_payment',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Data do pagamento" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date, true),
        enableColumnFilter: false,
      },
      {
        accessorKey: 'type_payment',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tipo do pagamento" />
        ),
        cell: ({ row }) => {
          const { type_payment } = row.original

          return (
            <Text scale={'xs'} variant={'body'}>
              {paymentMethodsList.find(
                (option) => option.value === type_payment,
              )?.label ?? ''}
            </Text>
          )
        },
      },
      {
        accessorKey: 'description',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Observações" />
        ),
        cell: ({ row }) => {
          const { description } = row.original

          return (
            <Text scale={'xs'} variant={'body'}>
              {description}
            </Text>
          )
        },
      },
      {
        id: 'actions',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Ações" />
        ),
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label="Open menu" variant="ghost">
                <Icons.settingsHorizontal
                  className="size-4"
                  aria-hidden="true"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem asChild>
                <Button
                  className="w-full justify-start"
                  variant={'ghost'}
                  onClick={() => {
                    onUpdate(row.original)
                    setSelectedExpense(row.original)
                    setIsUpdateDialogOpen(true)
                  }}
                >
                  <Icons.edit className="mr-2 size-4" aria-hidden="true" />
                  Editar
                </Button>
              </DropdownMenuItem>

              <Separator />

              <DropdownMenuItem asChild>
                <Button
                  variant={'ghost'}
                  onClick={() => {
                    setSelectedExpense(row.original)
                    setIsDeleteItem(true)
                    row.toggleSelected(false)
                  }}
                  className="w-full justify-start"
                >
                  <Icons.trash className="mr-2 size-4" aria-hidden="true" />{' '}
                  Deletar
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  )

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        pageCount={pageCount}
        defaultSort="date_payment.desc"
        filterFields={[
          {
            value: 'name',
            label: 'Descrição',
            placeholder: 'Buscar por descrição..',
          },
          {
            value: 'type_payment',
            label: 'Tipo do pagamento',
            placeholder: 'Tipo',
            options: paymentMethodsList,
          },
        ]}
        deleteRowsAction={() => setConfirmBatchDelete(true)}
      />

      <Sheet open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <SheetContent className="px-4">
          <SheetHeader>
            <SheetTitle>Alterar Receita</SheetTitle>
            <Separator />
          </SheetHeader>
          <SheetDescription className="sr-only">
            Alteração de dados de uma entrada.
          </SheetDescription>

          <Form {...formMethods}>
            <form className="grid gap-4">
              <InputForm name="name" label="Descrição" />

              <InputCurrency label="Valor" name="value" placeholder="R$ 0,00" />

              <div className="grid grid-cols-2 gap-2">
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    Data de recebimento
                  </FormLabel>

                  <DatePickerSingle
                    value={formMethods.watch('date_payment')?.toISOString()}
                    onChange={(value) => {
                      formMethods.setValue(
                        'date_payment',
                        value ? dayjs(new Date(value)).toDate() : new Date(),
                      )
                    }}
                    className="w-full"
                  />

                  <FormMessage>
                    {formMethods.formState.errors.date_payment?.message}
                  </FormMessage>
                </FormItem>

                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    Método de Pagamento
                  </FormLabel>

                  <SearchPopover
                    selectedValue={
                      formMethods.watch('type_payment')?.toString() || ''
                    }
                    onSelectedValueChange={(value) =>
                      formMethods.setValue(
                        'type_payment',
                        value as
                          | 'PIX'
                          | 'MONEY'
                          | 'CREDIT_CARD'
                          | 'TICKET'
                          | undefined,
                      )
                    }
                    searchValue={searchPaymentMethod}
                    onSearchValueChange={setSearchPaymentMethod}
                    items={paymentMethodsList ?? []}
                    isLoading={false}
                  />

                  <FormMessage>
                    {formMethods.formState.errors.type_payment?.message}
                  </FormMessage>
                </FormItem>
              </div>

              <FormField
                control={formMethods.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center justify-between">
                      Observações
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="ex: Recebimento do Salário"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>
                      {formMethods.formState.errors.description?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <SheetFooter className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 p-0 gap-2 mt-4">
            <SheetClose asChild>
              <Button type="button" variant="outline" className="w-full">
                Cancelar
              </Button>
            </SheetClose>

            <Button
              className="w-full"
              type="submit"
              disabled={isPending}
              onClick={formMethods.handleSubmit(execute)}
            >
              <LoadingOnButton
                isLoading={isPending}
                defaultText="Alterar"
                onActionText="Alterando..."
              />
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <ConfirmDialog
        onConfirm={() =>
          executeDeleteBatch({
            ids: selectedRowIds.map((item) => item.id),
          })
        }
        open={confirmBatchDelete}
        onCancel={() => setConfirmBatchDelete(false)}
        isLoading={isPendingDeleteBatch}
      />

      <ConfirmDialog
        onConfirm={handleDeleteExpense}
        open={!!selectedExpense && isDeleteItem}
        onCancel={() => {
          setSelectedExpense(null)
          setIsDeleteItem(false)
        }}
        isLoading={isPendingDelete}
      />
    </>
  )
}
