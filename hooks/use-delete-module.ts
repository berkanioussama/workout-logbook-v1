'use client'

import { useApiMutation } from './use-api-mutation'
import { useQueryClient } from '@tanstack/react-query'

interface UseDeleteModuleProps {
  name: string
  deleteFn: (id: string) => Promise<any>
  queryKey: string[]
}

export function useDeleteModule({ name, deleteFn, queryKey }: UseDeleteModuleProps) {
  const queryClient = useQueryClient()
  return useApiMutation(deleteFn, {
    successMessage: `${name} deleted successfully`,
    errorMessage: `Failed to delete ${name}`,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}