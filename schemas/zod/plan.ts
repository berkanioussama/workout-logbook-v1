import { z } from "zod"

export const addPlanSchema = z.object({
    name: z.string().min(1, "Name is required"),
})

export type AddPlanFormInput = z.input<typeof addPlanSchema>