'use client'

import { useQuery } from '@tanstack/react-query'
import { getPlans } from '@/features/plans/actions/plans'

export function useGetUserPlans() {
  const query = useQuery({
    queryKey: ['get-user-plans'],
    queryFn: getPlans,
    staleTime: 1000 * 60 * 5, // cache 5 minutes
  })

  return query
}