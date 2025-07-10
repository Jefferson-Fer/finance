import { cva, VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-colors disabled:cursor-not-allowed focus-visible:outline-none tracking-wide focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 group has-[svg]:gap-1',
  {
    variants: {
      variant: {
        default: 'bg-primary text-background shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80',
        outline:
          'border border-input bg-background shadow-sm hover:bg-foreground/20 hover:text-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        mutedGhost: 'hover:bg-muted',
        link: 'text-primary underline-offset-4 hover:underline',
        navsidebar: 'w-full p-0 gap-2 justify-center',
        destructiveLink:
          'bg-transparent text-destructive hover:text-destructive/80',
        blackLink:
          'bg-transparent text-black hover:text-primary text-sm font-normal',
        whiteLink:
          'bg-transparent text-white hover:text-white/80 text-sm font-normal',
        footerLink:
          'bg-transparent text-primary-foreground hover:text-background text-sm font-normal',
        numberButton:
          'bg-primary text-primary-foreground disabled:opacity-100 disabled:text-primary-foreground/50',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        xs: 'h-7 rounded-md px-2 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
      radii: {
        none: 'rounded-none',
        xs: 'rounded',
        sm: 'rounded-md',
        md: 'rounded-xl',
        lg: 'rounded-2xl',
        full: 'rounded-full',
      },
      w: {
        full: 'w-full',
        half: 'w-3/4',
        auto: 'w-auto',
      },
      isActive: {
        true: 'is-active',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      w: 'auto',
      radii: 'sm',
    },
    compoundVariants: [
      {
        variant: 'navsidebar',
        size: 'default',
        className: 'p-0',
      },
      {
        isActive: true,
        variant: 'outline',
        className: 'bg-accent text-accent-foreground',
      },
      {
        variant: 'destructive',
        size: 'icon',
        className:
          'p-0 size-9 bg-transparent text-destructive hover:bg-transparent shadow-none',
      },
      {
        variant: 'default',
        size: 'icon',
        className:
          'p-0 size-9 bg-transparent text-primary hover:bg-transparent shadow-none',
      },
    ],
  },
)
export type ButtonVariantType = VariantProps<typeof buttonVariants>
export { buttonVariants }
