'use client'

import { useApiMutation } from '@/hooks/use-api-mutation'
import { updatePlan } from '@/features/plans/actions/plans'
import { useQueryClient } from '@tanstack/react-query'

export function useUpdatePlan() {
  const queryClient = useQueryClient()
  return useApiMutation(updatePlan, {
    successMessage: 'Plan updated successfully',
    errorMessage: 'Failed to update plan',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-user-plans'] })
    },
  })
}