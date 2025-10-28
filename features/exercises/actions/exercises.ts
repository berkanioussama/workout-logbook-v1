'use server'

import { api } from '@/lib/api'
import { CreateExerciseFormInput, ExerciseSchema } from '../schemas/zod'

export async function getExercises() {
  const client = await api()
  const { data } = await client.get('exercises/user')
  return data.data
}

export async function createExercise(data: CreateExerciseFormInput) {
  const client = await api()
  const { data: plan } = await client.post('exercises', data)
  return plan.data
}

export async function updateExercise(data: ExerciseSchema) {
  const client = await api()
  const { data: plan } = await client.put(`exercises`, data)
  return plan.data
}

export async function deleteExercise(exerciseId: string) {
  const client = await api()
  await client.delete(`exercises/${exerciseId}`)
  return { success: true }
}