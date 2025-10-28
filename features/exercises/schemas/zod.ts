import { z } from "zod"

export const exerciseSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Exercise name is required"),
    description: z.string().optional(),
    sets: z.number().optional(),
    minReps: z.number().optional(),
    maxReps: z.number().optional(),
})

export const createExerciseSchema = z.object({
    name: z.string().min(1, "Exercise name is required"),
    description: z.string().optional(),
    sets: z.number().optional(),
    minReps: z.number().optional(),
    maxReps: z.number().optional(),
})

export const updateExerciseSchema = z.object({
    name: z.string().min(1, "Exercise name is required"),
    description: z.string().optional(),
    sets: z.number().optional(),
    minReps: z.number().optional(),
    maxReps: z.number().optional(),
})

export type ExerciseSchema = z.input<typeof exerciseSchema>
export type CreateExerciseFormInput = z.input<typeof createExerciseSchema>
export type UpdateExerciseFormInput = z.input<typeof updateExerciseSchema>