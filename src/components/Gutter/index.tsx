import { cn } from '@/utilities/cn'
import React, { forwardRef, Ref } from 'react'

type Props = {
  left?: boolean
  right?: boolean
  className?: string
  children: React.ReactNode
  ref?: Ref<HTMLDivElement>
}

export const Gutter = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { left = true, right = true, className, children } = props

  return (
    <div
      ref={ref}
      className={cn(
        'max-w-[1920px] mx-auto',
        left && 'pl-[var(--gutter-h)]',
        right && 'pr-[var(--gutter-h)]',
        className,
      )}
    >
      {children}
    </div>
  )
})

Gutter.displayName = 'Gutter'