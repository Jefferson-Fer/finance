import { VariantProps, cva } from 'class-variance-authority'

export const headlineVariants = cva('leading-6 font-sans font-bold', {
  variants: {
    size: {
      xs: 'text-[1rem]',
      sm: 'text-xl',
      md: 'text-2xl',
      lg: 'text-3xl',
      xl: 'text-4xl',
      '2xl': 'text-[2.625rem]',
      '3xl': 'text-5xl',
    },
    variant: {
      white: 'text-background',
      black: 'text-foreground',
      neutral: 'text-muted',
      heading: 'text-primary',
    },
  },
  defaultVariants: {
    variant: 'heading',
    size: 'md',
  },
  compoundVariants: [
    {
      variant: 'heading',
      size: '2xl',
      class: 'font-bold leading-9',
    },
  ],
})

export type HeadlineVariantTypes = VariantProps<typeof headlineVariants>
