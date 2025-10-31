import CreateExerciseForm from "@/features/exercises/components/create-exercise-form";
import ExercisesList from "@/features/exercises/components/exercises-list";
import FloatDrawerButton from "@/components/float-drawer-button";

const Exercises = () => {
    return ( 
        <div className="w-full min-h-svh">
            <div className="container p-4 max-w-2xl flex flex-col items-center justify-center ">
                <FloatDrawerButton
                    title="Create New Exercise"
                    formComponent={<CreateExerciseForm/>}
                />
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
    