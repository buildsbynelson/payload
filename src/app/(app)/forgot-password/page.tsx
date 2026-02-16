import type { Metadata } from 'next'

import { RenderParams } from '@/components/RenderParams'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import Image from 'next/image'
import Link from 'next/link'

import { ForgotPasswordForm } from '@/components/forms/ForgotPasswordForm'

export default async function ForgotPasswordPage() {
  return (
    <section className="grid grid-cols-[1fr_45%] h-screen font-[var(--font-body)] max-[1024px]:grid-cols-1 max-[1024px]:bg-cover max-[1024px]:bg-no-repeat max-[1024px]:bg-center max-[1024px]:bg-[url('/assets/images/image-3.svg')]">
      {/* Hero Image Section - Left side on desktop, behind on mobile */}
      <div className="h-full w-full bg-cover bg-no-repeat bg-center bg-[url('/assets/images/image-3.svg')] max-[1024px]:bg-none max-[1024px]:flex max-[1024px]:justify-center">
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

          {/* Back Link */}
          <Link 
            href="/login" 
            className="flex items-center mb-[30px] gap-1 no-underline"
          >
            <Image 
              src="/assets/icons/arrow-left.svg" 
              alt="left arrow" 
              width={24} 
              height={24} 
            />
            <p className="text-[var(--color-dark-500-rgb)] text-lg m-0">
              Back
            </p>
          </Link>

          {/* Title */}
          <div className="flex flex-col gap-4 w-full">
            <h3 className="mb-2 m-0 text-[32px] leading-[40px] font-bold max-[1024px]:text-[34px] max-[1024px]:mb-2">
              Forgot Password
            </h3>
          </div>

          <ForgotPasswordForm />
        </div>
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  description: 'Enter your email address to recover your password.',
  openGraph: mergeOpenGraph({
    title: 'Forgot Password',
    url: '/forgot-password',
  }),
  title: 'Forgot Password',
}