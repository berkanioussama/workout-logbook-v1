'use client'

import { useApiMutation } from '@/hooks/use-api-mutation'
import { useQueryClient } from '@tanstack/react-query'

interface UseCreateModuleProps {
    name: string
    createFn: (data: any) => Promise<any>
    queryKey: string[]
}

export function useCreateModule({ name, createFn, queryKey }: UseCreateModuleProps) {
  const queryClient = useQueryClient()
  return useApiMutation(createFn, {
    successMessage: `${name} created successfully`,
    errorMessage: `Failed to create ${name}`,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey })
    },
  })
}