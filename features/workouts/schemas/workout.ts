import { z } from "zod";

export const workoutSchema = z.object({
    id: z.string(),
    name: z.string().min(2, "Name must be at least 2 characters long"),
})

export const createWorkoutSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
})

export const updateWorkoutSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
})

export type WorkoutSchema = z.infer<typeof workoutSchema>
export type CreateWorkoutFormInput = z.infer<typeof createWorkoutSchema>
export type UpdateWorkoutFormInput = z.infer<typeof updateWorkoutSchema>