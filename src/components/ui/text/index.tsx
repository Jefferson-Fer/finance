import { ElementType, HTMLAttributes, forwardRef } from 'react'

import { Slot } from '@radix-ui/react-slot'

import { TextVariantType, textVariants } from '@/components/ui/text/styles'
import { cn } from '@/lib/utils'

export type TextProps = HTMLAttributes<HTMLParagraphElement> &
  TextVariantType & {
    asChild?: boolean
    as?: ElementType
  }

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      variant,
      weight,
      scale,
      asChild = false,
      as: Comp = 'p',
      ...props
    },
    ref,
  ) => {
    const FinalComp = asChild ? Slot : Comp
    return (
      <FinalComp
        className={cn(textVariants({ variant, scale, className, weight }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Text.displayName = 'Text'

export { Text, type TextVariantType }
