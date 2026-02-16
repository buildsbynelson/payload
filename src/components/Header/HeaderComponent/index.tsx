'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { Header } from '@/payload-types'
import { noHeaderFooterUrls } from '@/app/constants'
import { Gutter } from '@/components/Gutter'
import { HeaderNav } from '../Nav'

const HeaderComponent = ({ header }: { header: Header | null }) => {
  const pathname = usePathname()

  return (
    <nav
      className={`py-9 ${noHeaderFooterUrls.includes(pathname) ? 'hidden' : ''}`}
    >
      <Gutter className="flex items-center justify-between flex-wrap gap-3">
        <Link href="/">
          <Image src="/logo-black.svg" alt="logo" width={170} height={50} />
        </Link>

        <HeaderNav header={header} />
      </Gutter>
    </nav>
  )
}

export default HeaderComponent