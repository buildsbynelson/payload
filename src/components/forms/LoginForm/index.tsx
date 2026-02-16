'use client'

import { Button } from '@/components/Button'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/providers/Auth'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
}

export const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = React.useState<null | string>(null)

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      try {
        await login(data)
        if (redirect?.current) router.push(redirect.current)
        else router.push('/')
        window.location.href = '/'
      } catch (_) {
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router],
  )

  return (
    <form 
      className="w-full mb-6 flex flex-col gap-6 mt-[30px] items-start" 
      onSubmit={handleSubmit(onSubmit)}
    >
      <Message className="mb-6" error={error} />
      
      <FormItem className="w-full">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          {...register('email', { required: 'Email is required.' })}
        />
        {errors.email && <FormError message={errors.email.message} />}
      </FormItem>

      <FormItem className="w-full">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register('password', { required: 'Please provide a password.' })}
        />
        {errors.password && <FormError message={errors.password.message} />}
      </FormItem>

      <Button 
        className="w-full" 
        disabled={isLoading} 
        type="submit" 
        appearance="primary"
      >
        {isLoading ? 'Processing' : 'Login'}
      </Button>

      <div className="flex items-center justify-between w-full">
        <Link 
          href={`/create-account${allParams}`}
          className="text-sm hover:underline"
        >
          Create an account
        </Link>
        <Link 
          href={`/forgot-password${allParams}`}
          className="text-sm hover:underline"
        >
          Recover your password
        </Link>
      </div>
    </form>
  )
}