import WorkoutsList from "@/features/workouts/components/workouts-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateWorkoutForm from "@/features/workouts/components/create-workout-form";
import DrawerButton from "@/components/drawer-button";

const Workout = () => {
    return ( 
        <div className="flex items-center justify-center w-full min-h-svh">
            <div className="container px-4 max-w-2xl flex flex-col gap-4 items-center justify-center ">
                <h2 className="text-xl font-bold text-center">Workouts</h2>
                <DrawerButton
                    title="Create New Workout"
                    formComponent={<CreateWorkoutForm />}
                >
                    <Button><Plus /> Create New Workout</Button>
                </DrawerButton>
                <WorkoutsList/>
            </div>
        </div> 
    );
}
 
export default Workout;