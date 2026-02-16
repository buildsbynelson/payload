import type { User } from '@/payload-types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const checkRole = (allRoles: User['roles'] = [], user?: User | null): boolean => {
  if (user && allRoles) {
    return allRoles.some((role) => {
      return user?.roles?.some((individualRole) => {
        return individualRole === role
      })
    })
  }

  return false
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}