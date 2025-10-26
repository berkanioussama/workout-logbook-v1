import { z } from "zod"

// Raw form schema (string inputs)
export const userProfileSchema = z.object({
  bodyWeight: z.string().min(1, "Weight is required"),
  bodyHeight: z.string().min(1, "Height is required"),
  bodyFat: z.string().min(1, "Body fat is required"),

  weightUnit: z.enum(["kg", "lb"]).refine((val) => val === "kg" || val === "lb", {
    message: "Weight unit must be either 'kg' or 'lb'",
  }),

  measurementsUnit: z.enum(["cm", "in"]).refine((val) => val === "cm" || val === "in", {
    message: "Measurements unit must be either 'cm' or 'in'",
  }),
})

// Transformed schema (numbers for API/mutation)
export const transformedUserProfileSchema = userProfileSchema.transform((values) => ({
  bodyWeight: Number(values.bodyWeight),
  bodyHeight: Number(values.bodyHeight),
  bodyFat: Number(values.bodyFat),
  weightUnit: values.weightUnit,
  measurementsUnit: values.measurementsUnit,
}))

export type UserProfileFormInput = z.input<typeof userProfileSchema>
export type UserProfileFormOutput = z.output<typeof transformedUserProfileSchema>
