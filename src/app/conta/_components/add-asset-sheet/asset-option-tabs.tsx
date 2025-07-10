'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useStateAction } from 'next-safe-action/stateful-hooks'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createExpenseAction } from '@/actions/expense/create-expense-action'
import { createRevenueAction } from '@/actions/revenue/create-revenue-action'
import { InputForm } from '@/components/input-form'
import { Button } from '@/components/ui/button'
import { DatePickerSingle } from '@/components/ui/date-picker-single'
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
import { SheetClose, SheetFooter } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { paymentMethodsList } from '@/config/constants'
import { expenseSchema, ExpenseSchemaType } from '@/validators'
import {
  revenueSchema,
  RevenueSchemaType,
} from '@/validators/revenue-validator'

interface Props {
  setIsOpen: (open: boolean) => void
}

export function AssetOptionTabs({ setIsOpen }: Props) {
  const formMethodsRevenue = useForm<RevenueSchemaType>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(revenueSchema) as any,
    defaultValues: {
      value: 0,
      date_payment: new Date(),
    },
  })

  const formMethodsExpense = useForm<ExpenseSchemaType>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(expenseSchema) as any,
    defaultValues: {
      value: 0,
      date_payment: new Date(),
    },
  })

  const { execute, isPending } = useStateAction(createRevenueAction, {
    onSuccess: () => {
      toast.success('Receita criada com sucesso')
      formMethodsRevenue.reset()
      setIsOpen(false)
    },
    onError: () => {
      toast.error('Erro ao criar receita')
      formMethodsRevenue.reset()
      setIsOpen(false)
    },
  })

  const { execute: executeCreateExpense, isPending: isPendingExpense } =
    useStateAction(createExpenseAction, {
      onSuccess: () => {
        toast.success('Despesa criada com sucesso')
        formMethodsExpense.reset()
        setIsOpen(false)
      },
      onError: () => {
        toast.error('Erro ao criar despesa')
        formMethodsExpense.reset()
        setIsOpen(false)
      },
    })

  const [searchPaymentMethod, setSearchPaymentMethod] = useState('')

  const handleCreateRevenue = (data: RevenueSchemaType) => {
    execute(data)
  }

  const handleCreateExpense = (data: ExpenseSchemaType) => {
    executeCreateExpense(data)
  }

  return (
    <Tabs defaultValue="revenue">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="revenue">Receita</TabsTrigger>
        <TabsTrigger value="expense">Despesa</TabsTrigger>
      </TabsList>
      <TabsContent value="revenue" className="mt-4">
        <Form {...formMethodsRevenue}>
          <form className="grid gap-4">
            <InputForm name="name" label="Descrição" />

            <InputCurrency label="Valor" name="value" placeholder="R$ 0,00" />

            <div className="grid grid-cols-2 gap-2">
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  Data de recebimento
                </FormLabel>

                <DatePickerSingle
                  value={formMethodsRevenue
                    .watch('date_payment')
                    ?.toISOString()}
                  onChange={(value) => {
                    formMethodsRevenue.setValue(
                      'date_payment',
                      value ? dayjs(new Date(value)).toDate() : new Date(),
                    )
                  }}
                  className="w-full"
                />

                <FormMessage>
                  {formMethodsRevenue.formState.errors.date_payment?.message}
                </FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  Método de Pagamento
                </FormLabel>

                <SearchPopover
                  selectedValue={
                    formMethodsRevenue.watch('type_payment')?.toString() || ''
                  }
                  onSelectedValueChange={(value) =>
                    formMethodsRevenue.setValue(
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
                  {formMethodsRevenue.formState.errors.type_payment?.message}
                </FormMessage>
              </FormItem>
            </div>

            <FormField
              control={formMethodsRevenue.control}
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
                    {formMethodsRevenue.formState.errors.description?.message}
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
            onClick={formMethodsRevenue.handleSubmit(handleCreateRevenue)}
          >
            <LoadingOnButton
              isLoading={isPending}
              defaultText="Adicionar"
              onActionText="Adicionando..."
            />
          </Button>
        </SheetFooter>
      </TabsContent>
      <TabsContent value="expense" className="mt-4">
        <Form {...formMethodsExpense}>
          <form className="grid gap-4">
            <InputForm name="name" label="Descrição" />

            <InputCurrency label="Valor" name="value" placeholder="R$ 0,00" />

            <div className="grid grid-cols-2 gap-2">
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  Data de recebimento
                </FormLabel>

                <DatePickerSingle
                  value={formMethodsExpense
                    .watch('date_payment')
                    ?.toISOString()}
                  onChange={(value) => {
                    formMethodsExpense.setValue(
                      'date_payment',
                      value ? dayjs(new Date(value)).toDate() : new Date(),
                    )
                  }}
                  className="w-full"
                />

                <FormMessage>
                  {formMethodsExpense.formState.errors.date_payment?.message}
                </FormMessage>
              </FormItem>

              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  Método de Pagamento
                </FormLabel>

                <SearchPopover
                  selectedValue={
                    formMethodsExpense.watch('type_payment')?.toString() || ''
                  }
                  onSelectedValueChange={(value) =>
                    formMethodsExpense.setValue(
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
                  {formMethodsExpense.formState.errors.type_payment?.message}
                </FormMessage>
              </FormItem>
            </div>

            <FormField
              control={formMethodsExpense.control}
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
                    {formMethodsExpense.formState.errors.description?.message}
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
            onClick={formMethodsExpense.handleSubmit(handleCreateExpense)}
          >
            <LoadingOnButton
              isLoading={isPendingExpense}
              defaultText="Adicionar"
              onActionText="Adicionando..."
            />
          </Button>
        </SheetFooter>
      </TabsContent>
    </Tabs>
  )
}
