import { Button } from "@/components/ui/button";
import DrawerButton from "@/components/drawer-button";
import { Plus } from "lucide-react";
import CreateExerciseForm from "@/features/exercises/components/create-exercise-form";
import ExercisesList from "@/features/exercises/components/exercises-list";

const Exercises = () => {
    return ( 
        <div className="w-full min-h-svh">
            <div className="container px-4 max-w-2xl flex flex-col items-center justify-center ">
                <TopBar />
                <DrawerButton
                    title="Create New Exercise"
                    formComponent={<CreateExerciseForm/>}
                >
                    <Button size='lg'><Plus /> Create New Exercise</Button>
                </DrawerButton>
                <ExercisesList/>
            </div>
        </div>
    );
}
 
export default Exercises;

const TopBar = () => {
    return (
        <div className="container p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Exercises</h2>
        </div>
    );
}
    