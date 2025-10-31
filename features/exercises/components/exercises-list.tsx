'use client'

import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash } from "lucide-react"
import DrawerButton from "@/components/drawer-button"
import UpdateExerciseForm from "./update-exercise-form"
import { useGetModule } from "@/hooks/use-get-module"
import { useDeleteModule } from "@/hooks/use-delete-module"
import { deleteExercise } from "../actions/exercises"
import { getExercises } from "../actions/exercises"
import { ExerciseSchema } from "../schemas/zod"

const ExercisesList = () => {

    const { data: exercises, isLoading, error } = useGetModule({
        queryFn: getExercises,
        queryKey: ['get-user-exercises']
    })

    if (isLoading) return <div className="flex gap-2 items-center justify-center w-full h-svh"><Spinner /><p>Loading exercises...</p></div>
    if (!exercises) return <div className="flex items-center justify-center w-full h-svh"><p>No exercises found</p></div>
    if (error) return <div className="flex items-center justify-center w-full h-svh"><p>Error loading exercises</p></div>
        
    return ( 
        <div className="container max-w-2xl flex flex-col gap-4 justify-center ">
            <h2 className="text-xl font-bold text-center">My Exercises</h2>
            <div className="flex flex-col gap-2">
                {exercises.length === 0 && (
                    <p className="text-center">No exercises found</p>
                )}
                {exercises.map((exercise: any) => (
                    <Exercise key={exercise.id} exercise={exercise} />
                ))}
            </div>
        </div>
     );
}
 
export default ExercisesList;

const Exercise = ({ exercise }: { exercise: ExerciseSchema }) => {
    const { mutate: deleteExerciseAction, isPending: isDeleting } = useDeleteModule({
        name: "Exercise",
        deleteFn: deleteExercise,
        queryKey: ["get-user-exercises"]
    })

    const handleDeleteExercise = (exerciseId: string) => {
        if (confirm('Are you sure you want to delete this exercise?')) {
            deleteExerciseAction(exerciseId)
        }
    }
    return (
        <div key={exercise.id} className="flex items-center justify-between bg-main-dark p-4 rounded-lg">
            <div>
                <h3 className="text-lg font-semibold mb-1">{exercise.name}</h3>
                <div className="flex gap-4">
                    <p className="text-xs text-neutral-300">{exercise.sets} Sets</p>
                    <p className="text-xs text-neutral-300">Min Reps: {exercise.minReps}</p>
                    <p className="text-xs text-neutral-300">Max Reps: {exercise.maxReps}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <DrawerButton
                    title="Update Exercise"
                    formComponent={<UpdateExerciseForm exercise={exercise} />}
                >
                    <Button size="icon"><Pencil /></Button>
                </DrawerButton>
                
                <Button size="icon" variant="destructive" disabled={isDeleting}
                    onClick={() => handleDeleteExercise(exercise.id)} 
                ><Trash /></Button>
            </div>
        </div>
    )
}