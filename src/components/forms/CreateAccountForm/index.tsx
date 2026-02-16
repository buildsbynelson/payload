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
import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const message = response.statusText || 'There was an error creating the account.'
        setError(message)
        return
      }

      const redirect = searchParams.get('redirect')

      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      try {
        await login(data)
        clearTimeout(timer)
        if (redirect) router.push(redirect as string)
        else router.push(`/`)
        window.location.href = '/'
      } catch (_) {
        clearTimeout(timer)
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router, searchParams],
  )

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="mb-6 flex flex-col gap-6 items-start w-full mt-[30px]"
    >
      

      <Message error={error} className="mb-6" />

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
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          type="text"
          {...register('name', { required: 'Name is required.' })}
        />
        {errors.name && <FormError message={errors.name.message} />}
      </FormItem>

      <FormItem className="w-full">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register('password', { required: 'Password is required.' })}
        />
        {errors.password && <FormError message={errors.password.message} />}
      </FormItem>

      <FormItem className="w-full">
        <Label htmlFor="passwordConfirm">Confirm Password</Label>
        <Input
          id="passwordConfirm"
          type="password"
          {...register('passwordConfirm', {
            required: 'Please confirm your password.',
            validate: (value) => value === password.current || 'The passwords do not match',
          })}
        />
        {errors.passwordConfirm && <FormError message={errors.passwordConfirm.message} />}
      </FormItem>

      <Button
        type="submit"
        label={loading ? 'Processing' : 'Sign up'}
        disabled={loading}
        appearance="primary"
        className="w-full"
      />

      <div className="text-sm">
        {'Already have an account? '}
        <Link href={`/login${allParams}`} className="hover:underline">
          Login
        </Link>
      </div>
    </form>
  )
}