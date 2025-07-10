'use client'

import { ComponentProps, forwardRef, useState } from 'react'

import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'

import { InputVariantProps, inputVariants } from '../input/styles'

export type InputPasswordProps = ComponentProps<'input'> & InputVariantProps

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, radii, ...props }, ref) => {
    const [showPass, setShowPass] = useState(false)

    const handleChangeView = () => setShowPass((prev) => !prev)

    return (
      <div
        className={cn(
          inputVariants({ radii, className }),
          'flex flex-row items-center focus-within:text-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
        )}
      >
        <input
          className="
          hocus:outline-none hocus:bg-transparent hocus:ring-0 m-0
          size-full rounded-none border-0 bg-transparent
          p-0 invalid:border-transparent
          invalid:text-destructive focus:border-transparent focus:outline-none focus:ring-1 focus:ring-transparent focus:invalid:border-transparent focus:invalid:ring-transparent disabled:border-transparent disabled:bg-transparent disabled:text-muted disabled:shadow-none"
          ref={ref}
          {...props}
          type={showPass ? 'text' : 'password'}
        />
        <button
          type="button"
          className="h-5 w-4"
          onClick={handleChangeView}
          title={showPass ? 'Ocultar senha' : 'Exibir senha'}
        >
          {showPass ? (
            <Icons.view className="size-5" />
          ) : (
            <Icons.hide className="-mr-2 size-5" />
          )}
        </button>
      </div>
    )
  },
)

InputPassword.displayName = 'InputPassword'

export { InputPassword }
