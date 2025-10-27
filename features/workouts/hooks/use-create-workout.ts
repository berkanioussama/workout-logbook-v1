'use client'

import { useApiMutation } from '@/hooks/use-api-mutation'
import { createWorkout } from '@/features/workouts/actions/workouts'
import { useQueryClient } from '@tanstack/react-query'

export function useCreateWorkout() {
  const queryClient = useQueryClient()
  return useApiMutation(createWorkout, {
    successMessage: 'Workout created successfully',
    errorMessage: 'Failed to create workout',
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-user-workouts'] })
    },
  })
}