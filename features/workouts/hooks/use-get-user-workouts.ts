'use client'

import { useQuery } from '@tanstack/react-query'
import { getWorkouts } from '@/features/workouts/actions/workouts'

export function useGetUserWorkouts() {
  const query = useQuery({
    queryKey: ['get-user-workouts'],
    queryFn: getWorkouts,
    staleTime: 1000 * 60 * 5, // cache 5 minutes
  })

  return query
}