import { TypePayment } from '@prisma/client'

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
