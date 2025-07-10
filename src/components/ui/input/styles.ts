import { VariantProps, cva } from 'class-variance-authority'

export const inputVariants = cva(
  'flex-col items-start text-foreground border border-solid invalid:border-destructive invalid:text-destructive focus:invalid:border-destructive/50 focus:invalid:ring-destructive/50 flex w-full border-border bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-foreground/10',
  {
    variants: {
      radii: {
        md: 'rounded-md',
      },
      scale: {
        sm: 'h-8',
        md: 'h-9',
      },
    },
    defaultVariants: {
      radii: 'md',
      scale: 'md',
    },
  },
)

export type InputVariantProps = VariantProps<typeof inputVariants>
