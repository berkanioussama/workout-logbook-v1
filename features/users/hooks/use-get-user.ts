'use client'

import { useApiQuery } from '@/hooks/use-api-query'
import { getUser } from '@/features/users/actions/users'

export function useGetUser() {
  return useApiQuery(['user-info'], getUser, { staleTime: 1000 * 60 })
}