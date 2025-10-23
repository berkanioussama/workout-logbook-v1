'use client'

import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'

/**
 * A reusable wrapper around useQuery for server actions.
 *
 * @param key Unique query key (string or array)
 * @param fn  Async function that returns the data (e.g., getUser)
 * @param options Optional query options (staleTime, enabled, etc.)
 */
export function useApiQuery<TData>(
  key: string | any[],
  fn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData> {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: fn,
    staleTime: 1000 * 60 * 5, // default cache for 5 minutes
    ...options,
  })
}