'use client'

import { useQuery } from '@tanstack/react-query'

interface UseGetProps {
  queryFn: () => Promise<any>,
  queryKey: string[]
}

export function useGetModule({ queryFn, queryKey }: UseGetProps) {
  const query = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    staleTime: 1000 * 60 * 5, // cache 5 minutes
  })

  return query
}