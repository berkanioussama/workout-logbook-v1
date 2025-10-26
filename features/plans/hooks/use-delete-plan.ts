'use client'

import { useApiMutation } from '@/hooks/use-api-mutation'
import { deletePlan } from '@/features/plans/actions/plans'
import { useQueryClient } from '@tanstack/react-query'

export function useDeletePlan() {
  const queryClient = useQueryClient()
  return useApiMutation(deletePlan, {
    successMessage: 'Plan deleted successfully',
    errorMessage: 'Failed to delete plan',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-user-plans'] })
    },
  })
}