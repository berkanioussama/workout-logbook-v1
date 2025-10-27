'use client'

import { useApiMutation } from '@/hooks/use-api-mutation'
import { updateWorkout } from '@/features/workouts/actions/workouts'
import { useQueryClient } from '@tanstack/react-query'

export function useUpdateWorkout() {
  const queryClient = useQueryClient()
  
  return useApiMutation(updateWorkout, {
    successMessage: 'Workout updated successfully',
    errorMessage: 'Failed to update workout',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-user-workouts'] })
    },
  })
}