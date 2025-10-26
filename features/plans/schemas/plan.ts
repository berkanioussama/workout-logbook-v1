import { z } from "zod"

export const planSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Plan name is required"),
    isActive: z.boolean(),
    sundayWorkoutId: z.string().optional(),
    mondayWorkoutId: z.string().optional(),
    tuesdayWorkoutId: z.string().optional(),
    wednesdayWorkoutId: z.string().optional(),
    thursdayWorkoutId: z.string().optional(),
    fridayWorkoutId: z.string().optional(),
    saturdayWorkoutId: z.string().optional(),
})

export const addPlanSchema = z.object({
    name: z.string().min(1, "Plan name is required"),
    isActive: z.boolean().default(false),
    sundayWorkoutId: z.string().optional(),
    mondayWorkoutId: z.string().optional(),
    tuesdayWorkoutId: z.string().optional(),
    wednesdayWorkoutId: z.string().optional(),
    thursdayWorkoutId: z.string().optional(),
    fridayWorkoutId: z.string().optional(),
    saturdayWorkoutId: z.string().optional(),
})

export const PlanDaysSchema = z.object({
    sundayWorkoutId: z.string().optional(),
    mondayWorkoutId: z.string().optional(),
    tuesdayWorkoutId: z.string().optional(),
    wednesdayWorkoutId: z.string().optional(),
    thursdayWorkoutId: z.string().optional(),
    fridayWorkoutId: z.string().optional(),
    saturdayWorkoutId: z.string().optional(),
})

export const updatePlanSchema = z.object({
    name: z.string().min(1, "Plan name is required"),
    isActive: z.boolean().default(false),
    sundayWorkoutId: z.string().optional(),
    mondayWorkoutId: z.string().optional(),
    tuesdayWorkoutId: z.string().optional(),
    wednesdayWorkoutId: z.string().optional(),
    thursdayWorkoutId: z.string().optional(),
    fridayWorkoutId: z.string().optional(),
    saturdayWorkoutId: z.string().optional(),
})

export type PlanSchema = z.input<typeof planSchema>
export type AddPlanFormInput = z.input<typeof addPlanSchema>
export type PlanDaysFormInput = z.input<typeof PlanDaysSchema>
export type UpdatePlanFormInput = z.input<typeof updatePlanSchema>
