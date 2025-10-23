import axios from 'axios'
import { auth } from '@clerk/nextjs/server'

export async function api() {
    const { getToken } = await auth()
    const token = await getToken()

    const instance = axios.create({
        baseURL: process.env.DEV_BACKEND_API_URL,
        headers: {
        Authorization: `Bearer ${token}`,
        },
    })

    instance.interceptors.response.use(
    (response) => response,
    (error) => {
        let message = 'Server Error'
        if (error.response?.data) {
            if (typeof error.response.data === 'string') {
                if (error.response.data.includes('Cannot GET')) {
                    message = 'Invalid endpoint — check your API route.'
                } else {
                    message = error.response.data.slice(0, 100)
                }
            } else if (error.response.data.message) {
                message = error.response.data.message
            }
        }

        console.error('[API Error]', message)
        throw new Error(message)
    }
    )

  return instance
}