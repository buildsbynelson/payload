'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { inclusions, noHeaderFooterUrls } from '@/app/constants'
import { Button } from '@/components/Button'
import { Gutter } from '@/components/Gutter'
import type { Footer, Media } from '@/payload-types'

const FooterComponent = ({ footer }: { footer: Footer | null }) => {
  const pathname = usePathname()
  const navItems = footer?.navItems || []

  return (
    <footer className={noHeaderFooterUrls.includes(pathname) ? 'hidden' : ''}>
      <Gutter>
        {/* Inclusions grid - 2 cols default, 4 cols on desktop */}
        <ul className="grid justify-center gap-[30px] p-0 grid-cols-2 my-[60px] lg:grid-cols-4 lg:my-[100px]">
          {inclusions.map((inclusion) => (
            <li key={inclusion.title}>
              <Image
                src={inclusion.icon}
                alt={inclusion.title}
                width={36}
                height={36}
                className="mb-4"
              />

              <h5 className="my-5 mx-0 text-[22px] leading-[30px] font-bold md:text-lg md:leading-6">
                {inclusion.title}
              </h5>
              <p>{inclusion.description}</p>
            </li>
          ))}
        </ul>
      </Gutter>

      {/* Footer section - FIXED: only mobile at 768px, not laptop */}
      <div 
        className="py-[30px] max-[768px]:py-[calc(var(--base)*2)]"
        style={{ 
          backgroundColor: 'var(--color-dark-500-rgb)', 
          color: 'var(--color-white-500-rgb)' 
        }}
      >
        <Gutter>
          {/* FIXED: wrap only goes vertical on SMALL screens (768px), not laptop */}
          <div className="flex justify-between items-center flex-wrap gap-3 max-[768px]:mt-[30px] max-[768px]:flex-col max-[768px]:justify-center max-[768px]:text-center">
            <Link href="/">
              <Image src="/logo-white.svg" alt="logo" width={170} height={50} />
            </Link>

            <p>{footer?.copyright}</p>

            <div className="flex gap-5">
              {navItems.map((item) => {
                const icon = item?.link?.icon as Media

                return (
                  <Button
                    key={item.link.label}
                    el="link"
                    href={item.link.url}
                    newTab={true}
                    className="w-full"
                  >
                    {icon?.url && (
                      <Image
                        src={icon.url}
                        alt={item.link.label}
                        width={24}
                        height={24}
                        className="w-6 h-6 invert brightness-0"
                        style={{ filter: 'invert(1)' }}
                      />
                    )}
                  </Button>
                )
              })}
            </div>
          </div>
        </Gutter>
      </div>
    </footer>
  )
}

export default FooterComponent