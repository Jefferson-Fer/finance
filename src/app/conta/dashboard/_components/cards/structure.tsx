import NumberFlow from '@number-flow/react'

import { Icons } from '@/components/icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { CardType } from '@/config/constants'
import { cn } from '@/lib/utils'

type Props = {
  item: CardType
  classContainer?: string
}

export function StructureCard({ item, classContainer }: Props) {
  const Icon = Icons[item.icon as keyof typeof Icons]

  return (
    <Card className={cn(classContainer, 'w-full justify-between')}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="w-full flex items-center justify-between">
          {item.title}
          {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {item.value !== 0 && (
          <Text scale={'xl'} variant={item.variant}>
            <NumberFlow
              value={item.value}
              format={{
                style: 'currency',
                currency: 'BRL',
                trailingZeroDisplay: 'stripIfInteger',
              }}
            />
          </Text>
        )}
        <Text scale={'xs'} variant={'body'} className="align-bottom">
          {item.description}
        </Text>
      </CardContent>
    </Card>
  )
}
