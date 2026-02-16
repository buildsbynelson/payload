'use client'

import { Button } from '@/components/Button'
import { FormError } from '@/components/forms/FormError'
import { FormItem } from '@/components/forms/FormItem'
import { Message } from '@/components/Message'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
}

export const ForgotPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError(
        'There was a problem while attempting to send you a password reset email. Please try again.',
      )
    }
  }, [])

  return (
    <Fragment>
      {!success && (
        <React.Fragment>
          <p className="text-[var(--color-gray-500-rgb)] text-lg leading-6 mt-4">
            Enter your registered email address. We'll send you a code to reset your password.
          </p>

          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="w-full mt-[30px] flex flex-col gap-6 items-start"
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

            <Button
              type="submit"
              appearance="primary"
              label="Recover Password"
              className="w-full"
            />
          </form>
        </React.Fragment>
      )}
      {success && (
        <div className="flex flex-col gap-2.5 mt-[30px]">
          <h1 className="text-[32px] leading-[40px] font-bold m-0">
            Request submitted
          </h1>
          <p className="text-[var(--color-gray-500-rgb)] text-lg leading-6">
            Check your email for a link that will allow you to securely reset your password.
          </p>
        </div>
      )}
    </Fragment>
  )
}