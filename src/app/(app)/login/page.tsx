import type { Metadata } from 'next'

import { RenderParams } from '@/components/RenderParams'
import Image from 'next/image'
import Link from 'next/link'

import { LoginForm } from '@/components/forms/LoginForm'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export default async function Login() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(`/account?warning=${encodeURIComponent('You are already logged in.')}`)
  }

  return (
    <section className="grid grid-cols-[1fr_45%] h-screen max-[1024px]:grid-cols-1 max-[1024px]:bg-cover max-[1024px]:bg-no-repeat max-[1024px]:bg-center max-[1024px]:bg-[url('/assets/images/image-1.svg')]">
      {/* Hero Image Section - Left side on desktop, behind on mobile */}
      <div className="h-full w-full bg-cover bg-no-repeat bg-center bg-[url('/assets/images/image-1.svg')] max-[1024px]:bg-none max-[1024px]:flex max-[1024px]:justify-center">
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
              Welcome
            </h3>
            <Image 
              src="/assets/icons/hand.png" 
              alt="hand" 
              width={30} 
              height={30} 
            />
          </div>

          <p className="text-[var(--color-gray-500-rgb)]">
            Please login here
          </p>

          <LoginForm />
        </div>
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  description: 'Login or create an account to get started.',
  openGraph: {
    title: 'Login',
    url: '/login',
  },
  title: 'Login',
}