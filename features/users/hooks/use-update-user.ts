'use client'

import { useApiMutation } from '@/hooks/use-api-mutation'
import { updateUser } from '@/features/users/actions/users'

export function useUpdateUser() {
  return useApiMutation(updateUser, {
    successMessage: 'User updated successfully',
    errorMessage: 'Failed to update user',
  })
}