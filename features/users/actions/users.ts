'use server'

import { api } from '@/lib/api'

interface UpdateUserBodyData {
  bodyWeight?: number
  bodyHeight?: number
  bodyFat?: number
  weightUnit?: string
  measurementsUnit?: string
}

export async function getUser() {
    const instance = await api()
    const res = await instance.get('/users/profile')
    return res.data.data // backend returns { data: user }
}

export async function updateUser(data: UpdateUserBodyData) {
  const client = await api()
  const res = await client.put('/users/update', data)
  return res.data.data
}