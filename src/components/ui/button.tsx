import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/utilities/cn'

const buttonVariants = cva(
  "relative inline-flex items-center justify-center hover:cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 ',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'border border-input bg-card shadow-xs hover:bg-accent hover:bg-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'text-primary/50 hover:text-primary [&.active]:text-primary py-2 px-4 uppercase font-mono tracking-widest text-xs',
        link: 'text-primary underline-offset-4 hover:underline',
        nav: 'text-primary/50 hover:text-primary [&.active]:text-primary p-0 pt-2 pb-6 uppercase font-mono tracking-widest text-xs',
        // Your custom variants
        customPrimary: 'bg-[var(--color-dark-500-rgb)] text-[var(--color-white-500-rgb)] rounded-[10px] px-6 py-2.5 transition-opacity focus-visible:opacity-80 active:opacity-70 font-inherit text-inherit leading-inherit',
        customPrimaryInvert: 'bg-[var(--color-white-500-rgb)] text-[var(--color-dark-500-rgb)] rounded-[10px] px-6 py-2.5 transition-opacity focus-visible:opacity-80 active:opacity-70 font-inherit text-inherit leading-inherit',
        customSecondary: 'bg-transparent shadow-[inset_0_0_0_1px_var(--color-dark-500-rgb)] rounded-[10px] px-6 py-2.5 transition-opacity focus-visible:opacity-80 active:opacity-70 font-inherit text-inherit leading-inherit',
        customSecondaryInvert: 'bg-[var(--color-dark-500-rgb)] shadow-[inset_0_0_0_1px_var(--color-white-500-rgb)] rounded-[10px] px-6 py-2.5 transition-opacity focus-visible:opacity-80 active:opacity-70 font-inherit text-inherit leading-inherit',
        customDefault: 'p-0 text-[var(--theme-text)] transition-opacity focus-visible:opacity-80 active:opacity-70',
        customNone: 'p-0 text-[var(--theme-text)] transition-opacity focus-visible:opacity-80 active:opacity-70 [&_span]:normal-case [&_span]:leading-inherit [&_span]:text-inherit',
      },
      size: {
        clear: '',
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        custom: '', // No size constraints for custom variants
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    label?: string // Added for your original API
  }

function Button({ 
  className, 
  variant, 
  size, 
  asChild = false, 
  label,
  children,
  ...props 
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  // Wrap content with label styling when using custom variants
  const isCustomVariant = variant?.startsWith('custom')
  
  const content = isCustomVariant && (label || children) ? (
    <div className="flex items-center justify-around">
      {label && (
        <span className={cn(
          'flex items-center text-center',
          variant !== 'customNone' && 'label-text'
        )}>
          {label}
        </span>
      )}
      {children && (
        <div className="[&>svg]:mr-3 [&>svg]:w-6 [&>svg]:h-6">
          {children}
        </div>
      )}
    </div>
  ) : (
    children || label
  )

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {content}
    </Comp>
  )
}

export { Button, buttonVariants }
