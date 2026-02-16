'use client'

import React from 'react'
import Link from 'next/link'

import type { Header } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { Button } from '@/components/Button'
import { Cart } from '@/components/Cart'
import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ header: Header | null }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()

  return (
    <nav 
      className={`flex gap-6 items-center flex-wrap transition-opacity duration-100 [&>*]:no-underline ${
        user === undefined ? 'opacity-0 invisible' : 'opacity-100 visible'
      }`}
    >
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="none" />
      })}
      <Cart />
      {user && <Link href="/account">Account</Link>}
      {!user && (
        <Button
          el="link"
          href="/login"
          label="Login"
          appearance="primary"
          onClick={() => (window.location.href = '/login')}
        />
      )}
    </nav>
  )
}