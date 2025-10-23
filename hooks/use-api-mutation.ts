'use client'

import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'
import { toast } from 'sonner'

/**
 * A reusable mutation hook for POST/PUT/DELETE requests.
 * Automatically handles success/error toasts.
 */
export function useApiMutation<TData, TVariables = void>(
  fn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, Error, TVariables> & {
    successMessage?: string
    errorMessage?: string
  }
): UseMutationResult<TData, Error, TVariables> {
  return useMutation({
    mutationFn: fn,

    onSuccess: (data, variables, context, mutation) => {
      if (options?.successMessage) toast.success(options.successMessage)
      if (options?.onSuccess) options.onSuccess(data, variables, context, mutation)
    },

    onError: (error, variables, context, mutation) => {
      console.error('[API Mutation Error]', error)
      toast.error(options?.errorMessage || error.message)
      if (options?.onError) options.onError(error, variables, context, mutation)
    },
  })
}