'use client'

import { useApiQuery } from '@/hooks/use-api-query'
import { getProfile } from '@/features/users/actions/users'

export function useGetProfile() {
  return useApiQuery(['user-profile'], getProfile, { staleTime: 1000 * 60 })
}