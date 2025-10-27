'use client'

import { useQueryClient } from '@tanstack/react-query'
import { setActivePlan } from '@/features/plans/actions/plans'
import { useApiMutation } from '@/hooks/use-api-mutation'

export function useSetActivePlan() {
  const queryClient = useQueryClient()

  return useApiMutation(setActivePlan, {
    successMessage: 'Plan activated successfully',
    errorMessage: 'Failed to activate plan',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-user-plans'] })
    }
  })
}