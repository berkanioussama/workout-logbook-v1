import { z } from "zod";

export const workoutSchema = z.object({
    id: z.string(),
    name: z.string().min(2, "Name must be at least 2 characters long"),
})

export const createWorkoutSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    exercisesIds: z.array(z.string()).min(1, "At least one exercise is required")
});

export const updateWorkoutSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    exercisesIds: z.array(z.string()).min(1, "At least one exercise is required"),
});

export type WorkoutSchema = z.infer<typeof workoutSchema>
export type CreateWorkoutFormInput = z.infer<typeof createWorkoutSchema>
export type UpdateWorkoutFormInput = z.infer<typeof updateWorkoutSchema>

export const workoutExerciseSchema = z.object({
    id: z.string(),
    userId: z.string(),
    workoutId: z.string(),
    exerciseId: z.string(),
})


export const createWorkoutExerciseSchema = z.object({
    workoutId: z.string(),
    exerciseId: z.string(),
})

export type WorkoutExerciseSchema = z.infer<typeof workoutExerciseSchema>
export type CreateWorkoutExerciseFormInput = z.infer<typeof createWorkoutExerciseSchema>
