import { TypePayment } from '@prisma/client'

import { Icons } from '@/components/icons'
import { Option } from '@/contracts/commons'

export const paymentMethodsList: Option[] = [
  {
    value: TypePayment.PIX,
    label: 'Pix',
  },
  {
    value: TypePayment.CREDIT_CARD,
    label: 'Cartão de Crédito',
  },
  {
    value: TypePayment.MONEY,
    label: 'Dinheiro',
  },
  {
    value: TypePayment.TICKET,
    label: 'Boleto',
  },
]

export type CardVariantType = 'default' | 'destructive' | 'constructive'

export type CardType = {
  title: string
  description: string
  value: number
  icon: keyof typeof Icons
  variant: CardVariantType
}

export const cardsUser: CardType[] = [
  {
    title: 'Patrimônio (mês)',
    description: 'Total de receitas menos as despesas',
    value: 0,
    icon: 'money',
    variant: 'default',
  },
  {
    title: 'Entradas do (mês)',
    description: 'Total de receitas no mês atual',
    value: 0,
    icon: 'trendingUp',
    variant: 'constructive',
  },
  {
    title: 'Despesas do (mês)',
    description: 'Total de gastos no mês atual',
    value: 0,
    icon: 'trendingDown',
    variant: 'destructive',
  },
  {
    title: 'Dicas Financeiras',
    description:
      'Considere investir em educação financeira para tomar melhores decisões',
    value: 0,
    icon: 'lightbulb',
    variant: 'default',
  },
]
