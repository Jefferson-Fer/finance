import { cva, VariantProps } from 'class-variance-authority'

export const textVariants = cva('leading-6 font-sans font-bold ', {
  variants: {
    display: {
      flex: 'flex items-center',
    },
    scale: {
      '4xl': 'text-4xl',
      xl: 'text-2xl',
      lg: 'text-lg leading-5',
      md: 'text-base leading-6',
      sm: 'text-sm leading-6',
      xs: 'text-xs leading-6',
    },
    variant: {
      default: 'text-foreground',
      body: 'text-muted-foreground',
      white: 'text-background',
      destructive: 'text-destructive hover:text-destructive/80',
    },
    weight: {
      regular: 'font-extralight',
      medium: 'font-normal',
      semibold: 'font-semibold',
      bold: 'text-bold',
    },
  },
  defaultVariants: {
    variant: 'default',
    scale: 'md',
    weight: 'medium',
  },
})

export type TextVariantType = VariantProps<typeof textVariants>
