'use client'

import { useApiMutation } from '@/hooks/use-api-mutation'
import { deleteWorkout } from '@/features/workouts/actions/workouts'
import { useQueryClient } from '@tanstack/react-query'

export function useDeleteWorkout() {
  const queryClient = useQueryClient()
  return useApiMutation(deleteWorkout, {
    successMessage: 'Workout deleted successfully',
    errorMessage: 'Failed to delete workout',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-user-workouts'] })
    },
  })
}