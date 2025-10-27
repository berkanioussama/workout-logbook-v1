'use client'

import { useGetUserWorkouts } from "@/features/workouts/hooks/use-get-user-workouts"
import { Spinner } from "@/components/ui/spinner"
import { useDeleteWorkout } from "@/features/workouts/hooks/use-delete-workout"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash } from "lucide-react"
import DrawerButton from "@/components/drawer-button"
import UpdateWorkoutForm from "./update-workout-form"

const WorkoutsList = () => {

    const { data: workouts, isLoading, error } = useGetUserWorkouts()
    const { mutate: deleteWorkout, isPending: isDeleting } = useDeleteWorkout()

    const handleDeleteWorkout = (workoutId: string) => {
        if (confirm('Are you sure you want to delete this workout?')) {
            deleteWorkout(workoutId)
        }
    }

    if (isLoading) return <div className="flex gap-2 items-center justify-center w-full h-svh"><Spinner /><p>Loading workouts...</p></div>
    if (error) return <div className="flex items-center justify-center w-full h-svh"><p>Error loading workouts</p></div>
        
    return ( 
        <div className="container p-4 max-w-2xl flex flex-col gap-4 justify-center ">
            <h2 className="text-xl font-bold text-center">My Workouts</h2>
            <div className="flex flex-col gap-2">
                {workouts.length === 0 && (
                    <p className="text-center">No workouts found</p>
                )}
                {workouts.map((workout: any) => (
                    <div key={workout.id} className="flex items-center justify-between">
                        <h3 className="font-semibold">{workout.name}</h3>
                        <div className="flex gap-2">
                            <Button size="sm"><Eye /></Button>
                            <DrawerButton
                                title="Update Workout"
                                formComponent={<UpdateWorkoutForm workout={workout} />}
                            >
                                <Button size="sm"><Pencil /></Button>
                            </DrawerButton>
                            
                            <Button size="sm" variant="destructive" disabled={isDeleting}
                                onClick={() => handleDeleteWorkout(workout.id)} 
                            ><Trash /></Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default WorkoutsList;