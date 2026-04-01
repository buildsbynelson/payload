'use client'

import { CMSLink } from '@/components/Link'
import { RichText } from '@/components/RichText'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

export const CustomHero: React.FC<Page['hero']> = ({ richText, media, links }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  }, [setHeaderTheme])

  // Get media URL
  const mediaUrl =
    media &&
    typeof media !== 'string' &&
    `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${media.filename}`

  return (
    <section className="relative overflow-hidden flex justify-center max-[768px]:m-0">
      {/* Hero Wrapper with Background Image */}
      <div
        className="bg-[var(--color-dark-50-rgb)] w-full max-w-[1560px] max-h-[884px] flex items-center bg-cover bg-[revert] bg-no-repeat max-[768px]:bg-cover max-[768px]:bg-center"
        style={{ backgroundImage: mediaUrl ? `url(${mediaUrl})` : undefined }}
      >
        {/* Hero Text Box */}
        <div className="flex flex-col justify-center py-[12%] px-[var(--gutter-h)] w-full max-[1024px]:py-[10%] max-[1024px]:px-[30px] max-[768px]:py-[50px] max-[768px]:px-[30px]">
          
          {/* RichText Content with Adrian's typography styles */}
          {richText && (
  <div className="[&_h2]:text-[50px] [&_h2]:my-4 [&_h2]:max-[1024px]:text-[38px] [&_h2]:max-[1024px]:my-3 [&_h2]:max-[768px]:text-[30px] [&_h2]:max-[768px]:my-2 [&_h2]:break-words [&_p]:text-[20px] [&_p]:max-[1024px]:text-[18px] [&_p]:max-[768px]:text-[16px]">
  <RichText data={richText} enableGutter={false} />
</div>
          )}

          {/* Links with Adrian's styles */}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="list-none m-0 p-0 flex pt-[50px] flex-wrap -mx-3 [&>*]:mx-3">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}