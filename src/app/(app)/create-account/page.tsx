import type { Metadata } from 'next'

import { RenderParams } from '@/components/RenderParams'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'

import { CreateAccountForm } from '@/components/forms/CreateAccountForm'
import { redirect } from 'next/navigation'

export default async function CreateAccount() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(
      `/account?warning=${encodeURIComponent(
        'Cannot create a new account while logged in, please log out and try again.',
      )}`,
    )
  }

  return (
    <section className="grid grid-cols-[1fr_45%] h-screen overflow-auto max-[1024px]:grid-cols-1 max-[1024px]:bg-cover max-[1024px]:bg-no-repeat max-[1024px]:bg-center max-[1024px]:bg-[url('/assets/images/image-2.svg')]">
      {/* Hero Image Section - Left side on desktop, behind on mobile */}
      <div className="h-full w-full bg-cover bg-no-repeat bg-center bg-[url('/assets/images/image-2.svg')] max-[1024px]:bg-none max-[1024px]:flex max-[1024px]:justify-center">
        <Link href="/">
          <Image
            src="/logo-black.svg"
            alt="logo"
            width={250}
            height={23}
            className="m-[60px] w-[30%] min-w-[150px] z-10 max-[1024px]:w-[45%] max-[1024px]:m-2.5"
          />
        </Link>
      </div>

      {/* Form Section - Right side on desktop, centered on mobile */}
      <div className="flex flex-col justify-center items-center w-full h-full max-[1024px]:justify-start max-[1024px]:p-2.5">
        <div className="max-w-[600px] w-full p-[50px] rounded-[10px] max-[1024px]:backdrop-blur-[30px] max-[1024px]:bg-white/90 max-[1024px]:shadow-sm max-[768px]:p-[30px]">
          
          <RenderParams className="mt-6" />

          {/* Title with hand icon */}
          <div className="flex items-center gap-4 w-full">
            <h3 className="m-0 text-[32px] leading-[40px] font-bold max-[1024px]:text-[34px] max-[1024px]:mb-2">
              Create Account
            </h3>
            <Image 
              src="/assets/icons/hand.png" 
              alt="hand" 
              width={30} 
              height={30}
              className="h-6"
            />
          </div>

          <p className="text-[var(--color-gray-500-rgb)]">
            Please enter your details
          </p>

          <CreateAccountForm />
        </div>
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  description: 'Create an account or log in to your existing account.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
  title: 'Account',
}