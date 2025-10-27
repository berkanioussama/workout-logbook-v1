import { AddPlanFormInput } from "./plan";

export const DAYS_OF_WEEK: { name: keyof AddPlanFormInput; label: string }[] = [
  { name: 'sundayWorkoutId', label: 'Sunday' },
  { name: 'mondayWorkoutId', label: 'Monday' },
  { name: 'tuesdayWorkoutId', label: 'Tuesday' },
  { name: 'wednesdayWorkoutId', label: 'Wednesday' },
  { name: 'thursdayWorkoutId', label: 'Thursday' },
  { name: 'fridayWorkoutId', label: 'Friday' },
  { name: 'saturdayWorkoutId', label: 'Saturday' },
];