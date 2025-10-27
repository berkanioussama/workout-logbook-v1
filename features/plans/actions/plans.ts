'use server'

import { api } from '@/lib/api'
import { AddPlanFormInput, PlanSchema } from '../schemas/plan'

export async function getPlans() {
  const client = await api()
  const { data } = await client.get('plans/user')
  return data.data
}

export async function addPlan(data: AddPlanFormInput) {
  const client = await api()
  const { data: plan } = await client.post('plans', data)
  return plan.data
}

export async function updatePlan(data: PlanSchema) {
  const client = await api()
  const { data: plan } = await client.put(`plans`, data)
  return plan.data
}

export async function deletePlan(planId: string) {
  const client = await api()
  await client.delete(`plans/${planId}`)
  return { success: true }
}

export async function setActivePlan(planId: string) {
  const client = await api()
  const { data } = await client.put(`plans/set-active`, { id: planId })
  return data
}