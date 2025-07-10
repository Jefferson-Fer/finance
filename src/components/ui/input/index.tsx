import { ComponentProps, forwardRef } from 'react'

import { cn } from '@/lib/utils'

import { InputVariantProps, inputVariants } from './styles'

export type InputProps = ComponentProps<'input'> & InputVariantProps

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, radii, scale, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ radii, scale, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input, inputVariants }
