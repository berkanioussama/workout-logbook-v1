'use client'

import { useApiMutation } from './use-api-mutation'
import { useQueryClient } from '@tanstack/react-query'

interface UseUpdateModuleProps {
  name: string
  updateFn: (data: any) => Promise<any>
  queryKey: string[]
}

export function useUpdateModule({ name, updateFn, queryKey }: UseUpdateModuleProps) {
  const queryClient = useQueryClient()
  return useApiMutation(updateFn, {
    successMessage: `${name} updated successfully`,
    errorMessage: `Failed to update ${name}`,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}