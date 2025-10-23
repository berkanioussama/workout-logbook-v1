'use server'

import { api } from '@/lib/api'

interface AddPlanBodyData {
  name: string
}

export async function getPlans() {
  const client = await api()
  const { data } = await client.get('plans/user')
  return data.data
}

export async function addPlan(data: AddPlanBodyData) {
  const client = await api()
  const { data: plan } = await client.post('plans', data)
  return plan.data
}
