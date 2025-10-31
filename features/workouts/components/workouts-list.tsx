'use client'

import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import DrawerButton from "@/components/drawer-button"
import UpdateWorkoutForm from "./update-workout-form-v2"
import { getWorkoutExercises, getWorkouts } from "../actions/workouts"
import { useGetModule } from "@/hooks/use-get-module"
import { useDeleteModule } from "@/hooks/use-delete-module"
import { deleteWorkout } from "../actions/workouts"
import { WorkoutSchema } from "../schemas/zod"
import { getExercises } from "@/features/exercises/actions/exercises"
import { ExerciseSchema } from "@/features/exercises/schemas/zod"

const WorkoutsList = () => {

    const { data: workouts, isLoading, error } = useGetModule({ queryFn: getWorkouts, queryKey: ['get-user-workouts'] })

    const { data: exercises } = useGetModule({ queryFn: getExercises, queryKey: ['get-user-exercises'] })

    if (isLoading) return <div className="flex gap-2 items-center justify-center w-full h-svh"><Spinner /><p>Loading workouts...</p></div>
    if (!workouts) return <div className="flex items-center justify-center w-full h-svh"><p>No workouts found</p></div>
    if (error) return <div className="flex items-center justify-center w-full h-svh"><p>Error loading workouts</p></div>
        
    return ( 
        <div className="container p-4 max-w-2xl flex flex-col gap-4 justify-center ">
            <h2 className="text-xl font-bold">My Workouts</h2>
            <div className="flex flex-col gap-2">
                {workouts.length === 0 && (
                    <p className="text-center">No workouts found</p>
                )}
                {workouts.map((workout: WorkoutSchema) => (
                    <Workout key={workout.id} workout={workout} exercises={exercises} />
                ))}
            </div>
        </div>
     );
}
 
export default WorkoutsList;

const Workout = ({ workout, exercises }: { workout: WorkoutSchema, exercises: ExerciseSchema[] }) => {

    const { mutate: deleteWorkoutAction, isPending: isDeleting } = useDeleteModule({
        name: "Workout",
        deleteFn: deleteWorkout,
        queryKey: ["get-user-workouts"]
    })

    const handleDeleteWorkout = (workoutId: string) => {
        if (confirm('Are you sure you want to delete this workout?')) {
            deleteWorkoutAction(workoutId)
        }
    }

    const { data: workoutExercises, isLoading, error } = useGetModule({ queryFn: () => getWorkoutExercises(workout.id), queryKey: ['get-workout-exercises', workout.id] });

    const exercisesNumber = workoutExercises?.length || 0

    return (
        <div className="flex items-center justify-between bg-main-dark p-4 rounded-lg">
            <div>
                <h3 className="font-semibold">{workout.name}</h3>
                <p className="text-xs text-neutral-300">{exercisesNumber} exercises </p>
            </div>
            <div className="flex gap-2">
                <DrawerButton
                    title="Update Workout"
                    formComponent={<UpdateWorkoutForm workout={workout} exercises={exercises} />}
                >
                    <Button size="sm"><Pencil /></Button>
                </DrawerButton>
                
                <Button size="sm" variant="destructive" disabled={isDeleting}
                    onClick={() => handleDeleteWorkout(workout.id)} 
                ><Trash /></Button>
            </div>
        </div>
    )
}