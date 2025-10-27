'use server'

import { api } from '@/lib/api'
import { CreateWorkoutFormInput, UpdateWorkoutFormInput } from '../schemas/workout'

export async function getWorkouts() {
  const client = await api()
  const { data } = await client.get('workouts/user')
  return data.data
}

export async function createWorkout(data: CreateWorkoutFormInput) {
  console.log(data)
  const client = await api()
  const { data: workout } = await client.post('workouts', data)
  return workout.data
}

export async function deleteWorkout(workoutId: string) {
  const client = await api()
  const { data } = await client.delete(`workouts/${workoutId}`)
  return data.data
}

export async function updateWorkout(data: UpdateWorkoutFormInput) {
  const client = await api()
  const { data: workout } = await client.put(`workouts`, data)
  return workout.data
}
