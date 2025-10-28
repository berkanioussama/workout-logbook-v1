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

const ExercisesList = () => {

    const { data: exercises, isLoading, error } = useGetModule({
        queryFn: getExercises,
        queryKey: ['get-user-exercises']
    })
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

    if (isLoading) return <div className="flex gap-2 items-center justify-center w-full h-svh"><Spinner /><p>Loading exercises...</p></div>
    if (error) return <div className="flex items-center justify-center w-full h-svh"><p>Error loading exercises</p></div>
        
    return ( 
        <div className="container p-4 max-w-2xl flex flex-col gap-4 justify-center ">
            <h2 className="text-xl font-bold text-center">My Exercises</h2>
            <div className="flex flex-col gap-2">
                {exercises.length === 0 && (
                    <p className="text-center">No exercises found</p>
                )}
                {exercises.map((exercise: any) => (
                    <div key={exercise.id} className="flex items-center justify-between">
                        <h3 className="font-semibold">{exercise.name}</h3>
                        <div className="flex gap-2">
                            <Button size="sm"><Eye /></Button>
                            <DrawerButton
                                title="Update Exercise"
                                formComponent={<UpdateExerciseForm exercise={exercise} />}
                            >
                                <Button size="sm"><Pencil /></Button>
                            </DrawerButton>
                            
                            <Button size="sm" variant="destructive" disabled={isDeleting}
                                onClick={() => handleDeleteExercise(exercise.id)} 
                            ><Trash /></Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default ExercisesList;