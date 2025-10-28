import { z } from "zod"

export const exerciseSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Exercise name is required"),
    description: z.string().optional(),
    sets: z.string().min(1, "Sets is required"),
    minReps: z.string().min(1, "Min reps is required"),
    maxReps: z.string().min(1, "Max reps is required"),
})

export const createExerciseSchema = z.object({
    name: z.string().min(1, "Exercise name is required"),
    description: z.string().optional(),
    sets: z.string().min(1, "Sets is required"),
    minReps: z.string().min(1, "Min reps is required"),
    maxReps: z.string().min(1, "Max reps is required"),
})

export const updateExerciseSchema = z.object({
    name: z.string().min(1, "Exercise name is required"),
    description: z.string().optional(),
    sets: z.number(),
    minReps: z.number(),
    maxReps: z.number(),
})

export const transformedCreateExerciseSchema = createExerciseSchema.transform((values) => ({
    name: values.name,
    description: values.description,
    sets: Number(values.sets),
    minReps: Number(values.minReps),
    maxReps: Number(values.maxReps),
}))

export type ExerciseSchema = z.input<typeof exerciseSchema>
export type CreateExerciseFormInput = z.input<typeof createExerciseSchema>
export type UpdateExerciseFormInput = z.input<typeof updateExerciseSchema>
export type CreateExerciseFormOutput = z.input<typeof transformedCreateExerciseSchema>