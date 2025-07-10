import { cn } from '@/lib/utils'

import { ButtonLink } from './ui/button-link'
import { Headline } from './ui/headline'
import { Text } from './ui/text'

interface EmptyStateProps {
  title: string
  description: string
  buttonText?: string
  buttonLink?: string
  className?: string
}

export default function EmptyState({
  title,
  description,
  buttonText,
  buttonLink,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-1 items-center justify-center p-4 lg:p-8 border border-dashed border-border rounded-md',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <Headline variant="black" as="h3" size="md" className="tracking-tight">
          {title}
        </Headline>
        <Text variant="body" scale={'sm'}>
          {description}
        </Text>
        {buttonText && buttonLink && (
          <ButtonLink href={buttonLink} className="mt-4">
            {buttonText}
          </ButtonLink>
        )}
      </div>
    </div>
  )
}
