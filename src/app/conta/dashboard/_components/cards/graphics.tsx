'use client'

import {
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const pieColors = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

const chartConfigSaldo = {
  valor: {
    label: 'Patrimônio',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig

const chartConfigGastos = {
  valor: {
    label: 'Gastos',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

interface CardsGraphicsProps {
  items: { mes: string; valor: number }[]
  expenseSectors: { setor: string; valor: number }[]
}

export default function CardsGraphics({
  items,
  expenseSectors,
}: CardsGraphicsProps) {
  return (
    <div className="w-full space-y-6">
      {/* Gráficos */}
      <div className="overflow-x-auto grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Gráfico de Evolução do Patrimônio */}
        <Card className="min-w-[320px] w-full md:min-w-0">
          <CardHeader>
            <CardTitle>Saldo Mensal</CardTitle>
            <CardDescription>
              Acompanhe a evolução do seu saldo ao longo dos meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfigSaldo}
              className="min-h-[300px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={items}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis
                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [
                        `R$ ${Number(value).toLocaleString('pt-BR')} `,
                        'Saldo',
                      ]}
                    />
                  }
                />
                <Bar dataKey="valor" fill="var(--color-valor)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Gráfico Pizza de Gastos por Setor */}
        <Card className="min-w-[320px] w-full md:min-w-0">
          <CardHeader>
            <CardTitle>Gastos por Setor</CardTitle>
            <CardDescription>
              Distribuição dos seus gastos por categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfigGastos}
              className="min-h-[300px] w-full"
            >
              <PieChart>
                <Pie
                  data={expenseSectors}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ setor, percent }) =>
                    `${setor} ${percent !== undefined ? (percent * 100).toFixed(0) : '0'}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                >
                  {expenseSectors.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={pieColors[index % pieColors.length]}
                    />
                  ))}
                </Pie>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [
                        `R$ ${Number(value).toLocaleString('pt-BR')} `,
                        'Gasto',
                      ]}
                    />
                  }
                />
                <Legend />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
