import React, { useMemo } from 'react'

import { cardsUser } from '@/config/constants'
import { ExpenseType } from '@/contracts/expense'
import { RevenueType } from '@/contracts/revenue'

import { CarouselCards } from './carousel'
import CardsGraphics from './graphics'
import { StructureCard } from './structure'

interface Props {
  revenues: RevenueType
  expenses: ExpenseType
}

export default function CardsInfo({ revenues, expenses }: Props) {
  const { totalCurrentMonth: totalRevenueCurrentMonth } = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    let totalCurrentMonth = 0
    for (const revenue of revenues) {
      if (revenue.date_payment) {
        const date =
          typeof revenue.date_payment === 'string'
            ? new Date(revenue.date_payment)
            : revenue.date_payment
        if (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        ) {
          totalCurrentMonth += revenue.value
        }
      }
    }
    return { totalCurrentMonth }
  }, [revenues])

  const { totalCurrentMonth: totalExpenseCurrentMonth } = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    let totalCurrentMonth = 0
    for (const expense of expenses) {
      if (expense.date_payment) {
        const date =
          typeof expense.date_payment === 'string'
            ? new Date(expense.date_payment)
            : expense.date_payment
        if (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        ) {
          totalCurrentMonth += expense.value
        }
      }
    }
    return { totalCurrentMonth }
  }, [expenses])

  const netTotalAll = useMemo(
    () => totalRevenueCurrentMonth - totalExpenseCurrentMonth,
    [totalRevenueCurrentMonth, totalExpenseCurrentMonth],
  )

  const monthlyNetTotals = useMemo(() => {
    // Mapeia número do mês para inicial em português
    const monthNames = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ]
    // Mapa auxiliar para somar receitas e despesas por mês/ano
    const map = new Map()
    // Soma receitas
    for (const revenue of revenues) {
      if (!revenue.date_payment) continue
      const date =
        typeof revenue.date_payment === 'string'
          ? new Date(revenue.date_payment)
          : revenue.date_payment
      const key = `${date.getFullYear()}-${date.getMonth()}`
      if (!map.has(key))
        map.set(key, {
          revenue: 0,
          expense: 0,
          month: date.getMonth(),
          year: date.getFullYear(),
        })
      map.get(key).revenue += revenue.value
    }
    // Soma despesas
    for (const expense of expenses) {
      if (!expense.date_payment) continue
      const date =
        typeof expense.date_payment === 'string'
          ? new Date(expense.date_payment)
          : expense.date_payment
      const key = `${date.getFullYear()}-${date.getMonth()}`
      if (!map.has(key))
        map.set(key, {
          revenue: 0,
          expense: 0,
          month: date.getMonth(),
          year: date.getFullYear(),
        })
      map.get(key).expense += expense.value
    }
    // Monta array final ordenado por ano/mês
    return Array.from(map.values())
      .sort((a, b) => (a.year !== b.year ? a.year - b.year : a.month - b.month))
      .map(({ month, year, revenue, expense }) => ({
        mes: `${monthNames[month]}/${String(year).slice(-2)}`,
        valor: revenue - expense,
      }))
  }, [revenues, expenses])

  const topExpenseSectors = useMemo(() => {
    // Agrupa despesas por name
    const sectorMap = new Map()
    for (const expense of expenses) {
      if (!expense.name) continue
      if (!sectorMap.has(expense.name)) sectorMap.set(expense.name, 0)
      sectorMap.set(expense.name, sectorMap.get(expense.name) + expense.value)
    }
    // Transforma em array
    const sectors = Array.from(sectorMap.entries()).map(([setor, valor]) => ({
      setor,
      valor,
    }))
    // Ordena por valor decrescente
    sectors.sort((a, b) => b.valor - a.valor)
    // Pega as 4 maiores, soma o resto
    const top4 = sectors.slice(0, 4)
    const outrosValor = sectors
      .slice(4)
      .reduce((acc, cur) => acc + cur.valor, 0)
    if (outrosValor > 0) {
      top4.push({ setor: 'Outros', valor: outrosValor })
    }
    return top4
  }, [expenses])

  cardsUser[0].value = netTotalAll
  cardsUser[1].value = totalRevenueCurrentMonth
  cardsUser[2].value = totalExpenseCurrentMonth

  return (
    <div className="w-full overflow-hidden px-2 md:px-4 lg:px-6">
      <div className="hidden md:block">
        <div className="w-full grid grid-cols-4 gap-1">
          {cardsUser.map((item) => (
            <StructureCard item={item} key={item.title} />
          ))}
        </div>
      </div>

      <div className="block md:hidden">
        <CarouselCards
          options={{ loop: true, align: 'start' }}
          items={cardsUser.map((item) => ({
            ...item,
            value: typeof item.value === 'number' ? item.value : 0,
          }))}
        />
      </div>

      <div className="pt-2">
        <CardsGraphics
          items={monthlyNetTotals}
          expenseSectors={topExpenseSectors}
        />
      </div>
    </div>
  )
}
