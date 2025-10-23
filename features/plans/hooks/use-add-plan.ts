'use client'

import { useApiMutation } from '@/hooks/use-api-mutation'
import { addPlan } from '@/features/plans/actions/plans'

export function useAddPlan() {
  return useApiMutation(addPlan, {
    successMessage: 'Plan added successfully',
    errorMessage: 'Failed to add plan',
  })
}