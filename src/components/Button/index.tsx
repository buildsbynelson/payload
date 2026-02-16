'use client'

import { cn } from '@/access/utilities'
import Link from 'next/link'
import React, { ElementType } from 'react'

export type Props = {
  label?: string
  appearance?: 'default' | 'primary' | 'secondary' | 'none'
  el?: 'button' | 'link' | 'a'
  onClick?: () => void
  href?: string
  newTab?: boolean
  className?: string
  type?: 'submit' | 'button'
  disabled?: boolean
  invert?: boolean
  children?: React.ReactNode
}

export const Button: React.FC<Props> = ({
  el: elFromProps = 'link',
  label,
  newTab,
  href,
  appearance = 'default',
  className: classNameFromProps,
  onClick,
  type = 'button',
  disabled,
  invert,
  children,
}) => {
  let el = elFromProps

  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  // Base button styles
  const baseStyles = 'border-0 cursor-pointer inline-flex justify-center bg-transparent no-underline py-2.5 px-6 font-inherit leading-inherit text-inherit rounded-[10px] transition-opacity focus-visible:opacity-80 active:opacity-70'

  // Appearance styles using CSS variables
  const getAppearanceStyles = () => {
    if (appearance === 'primary') {
      return invert 
        ? 'bg-[var(--color-white-500-rgb)] text-[var(--color-dark-500-rgb)]'
        : 'bg-[var(--color-dark-500-rgb)] text-[var(--color-white-500-rgb)]'
    }
    if (appearance === 'secondary') {
      return invert
        ? 'bg-[var(--color-dark-500-rgb)] shadow-[inset_0_0_0_1px_var(--color-white-500-rgb)]'
        : 'bg-transparent shadow-[inset_0_0_0_1px_var(--color-dark-500-rgb)]'
    }
    if (appearance === 'default') {
      return 'p-0 text-[var(--theme-text)]'
    }
    if (appearance === 'none') {
      return 'p-0 text-[var(--theme-text)]'
    }
    return ''
  }

  const className = cn(
    baseStyles,
    getAppearanceStyles(),
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    classNameFromProps,
  )

  const content = (
    <div className="flex items-center justify-around">
      <span 
        className={cn(
          'flex items-center text-center',
          appearance === 'none' 
            ? 'normal-case leading-inherit text-inherit' 
            : 'label-text'
        )}
      >
        {label}
      </span>
      {children && (
        <div className="[&>svg]:mr-3 [&>svg]:w-6 [&>svg]:h-6">
          {children}
        </div>
      )}
    </div>
  )

  if (onClick || type === 'submit') el = 'button'

  if (el === 'link') {
    return (
      <Link href={href || ''} className={className} {...newTabProps} onClick={onClick}>
        {content}
      </Link>
    )
  }

  const Element: ElementType = el

  return (
    <Element
      href={href}
      className={className}
      type={type}
      {...newTabProps}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </Element>
  )
}

// Demo
export default function ButtonDemo() {
  return (
    <div className="container py-12 space-y-12">
      <div className="p-8 bg-white rounded-lg">
        <h2 className="mb-6 text-black">Light Background</h2>
        <div className="flex flex-wrap gap-4">
          <Button appearance="primary" label="Primary" el="button" />
          <Button appearance="primary" label="Primary Inverted" el="button" invert />
          <Button appearance="secondary" label="Secondary" el="button" />
          <Button appearance="secondary" label="Secondary Inverted" el="button" invert />
          <Button appearance="default" label="Default" el="button" />
          <Button appearance="none" label="None" el="button" />
          <Button appearance="primary" label="Disabled" el="button" disabled />
        </div>
      </div>

      <div className="p-8 bg-[var(--color-dark-500-rgb)] rounded-lg">
        <h2 className="mb-6 text-white">Dark Background</h2>
        <div className="flex flex-wrap gap-4">
          <Button appearance="primary" label="Primary" el="button" />
          <Button appearance="primary" label="Primary Inverted" el="button" invert />
          <Button appearance="secondary" label="Secondary" el="button" />
          <Button appearance="secondary" label="Secondary Inverted" el="button" invert />
        </div>
      </div>

      <div className="p-8 bg-white rounded-lg">
        <h2 className="mb-6 text-black">With Icons & Links</h2>
        <div className="flex flex-wrap gap-4">
          <Button appearance="primary" label="With Icon" el="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Button>
          <Button appearance="primary" label="Link Button" href="/about" />
          <Button 
            appearance="primary" 
            label="Click Me" 
            el="button" 
            onClick={() => alert('Button clicked!')} 
          />
        </div>
      </div>
    </div>
  )
}