'use client'
import WorkoutsList from "@/features/workouts/components/workouts-list";
import CreateWorkoutForm from "@/features/workouts/components/create-workout-form";
import FloatDrawerButton from "@/components/float-drawer-button";
import { useGetModule } from "@/hooks/use-get-module";
import { getExercises } from "@/features/exercises/actions/exercises";

const Workout = () => {

    const { data: exercises, isLoading: isLoadingExercises, error: errorExercises } = useGetModule({
        queryFn: getExercises,
        queryKey: ['get-user-exercises']
    })

    return ( 
        <div className="w-full min-h-svh">
            <div className="container p-4 max-w-xl mx-auto flex flex-col gap-4 items-center justify-center">
                <FloatDrawerButton
                    title="Create New Workout"
                    formComponent={<CreateWorkoutForm exercises={exercises} />}
                />
                <WorkoutsList/>
            </div>
        </div> 
    );
}
 
export default Workout;