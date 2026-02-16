import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import HeaderComponent from './HeaderComponent'
import type { Header } from '@/payload-types'

export async function Header() {
  let header: Header | null = null

  try {
    header = await getCachedGlobal('header', 1)()
  } catch (error) {
    console.log(error)
  }

  return <HeaderComponent header={header} />
}