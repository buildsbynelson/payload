import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import FooterComponent from './FooterComponent'
import type { Footer } from '@/payload-types'

export async function Footer() {
  let footer: Footer | null = null

  try {
    footer = await getCachedGlobal('footer', 1)()
  } catch (error) {
    console.log(error)
  }

  return <FooterComponent footer={footer} />
}