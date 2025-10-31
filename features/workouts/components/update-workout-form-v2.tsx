'use client'
import { WorkoutSchema } from "../schemas/zod"
import { ExerciseSchema } from "@/features/exercises/schemas/zod"
import { useUpdateModule } from "@/hooks/use-update-module"
import { updateWorkout } from "../actions/workouts"
import { useGetModule } from "@/hooks/use-get-module"
import { getWorkoutExercises } from "../actions/workouts"
import { Control, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateWorkoutSchema, UpdateWorkoutFormInput } from "../schemas/zod"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Plus, Trash } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect } from "react"
import { WorkoutExerciseSchema } from "../schemas/zod"

const UpdateWorkoutForm = ({ workout, exercises }: { workout: WorkoutSchema, exercises: ExerciseSchema[] }) => {

    const { mutate, isPending } = useUpdateModule({ name: "Workout", updateFn: updateWorkout, queryKey: ["get-user-workouts"], });

    const form = useForm<UpdateWorkoutFormInput>({
        resolver: zodResolver(updateWorkoutSchema),
        defaultValues: { name: workout.name, exercisesIds: [], },
    });
    
    const onSubmit = (values: UpdateWorkoutFormInput) => {
        const data = { ...values , id: workout.id };
        mutate(data); 
    };

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <WorkoutFields control={form.control}/>
                <ExercisesFields 
                    control={form.control}
                    workoutId={workout.id}
                    exercises={exercises}
                    disableAdd={!exercises.length}
                />
                <SubmitButton isPending={isPending} text="Update Workout" />
            </form>
        </Form>
    )
}

export default UpdateWorkoutForm

const WorkoutFields = ({control}: {control: Control<UpdateWorkoutFormInput>}) => {
    return (
        <FormField
            control={control}
            name="name"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Workout Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Add Workout Name" {...field}/>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

interface ExercisesFieldsProps {
    control: Control<UpdateWorkoutFormInput>;
    exercises: ExerciseSchema[];
    workoutId: string;
    disableAdd: boolean;

}
const ExercisesFields = ({ control, exercises, workoutId, disableAdd }: ExercisesFieldsProps) => {
    const { data: workoutExercises, isLoading, error } = useGetModule({ queryFn: () => getWorkoutExercises(workoutId), queryKey: ['get-workout-exercises', workoutId] });

    const { fields, append, remove } = useFieldArray({ control: control, name: "exercisesIds" });

    useEffect(() => {
        if (!workoutExercises) return;
        workoutExercises.forEach((workoutExercise: WorkoutExerciseSchema) => append(workoutExercise.exerciseId))
    }, [workoutExercises])

    if (isLoading) return <Spinner />

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold">Exercises</h3>
            <div className="space-y-3">
                {fields.map((field, index) => (
                    <ExerciseField key={field.id} index={index} control={control} exercises={exercises} onRemoveExercise={remove} />
                ))}
                <AddExerciseButton onAddExercises={() => append(exercises[0]?.id || "")} disableAdd={disableAdd} />
            </div>
        </div>
    )
}

interface ExerciseFieldProps {
    index: number;
    control: Control<UpdateWorkoutFormInput>;
    exercises: ExerciseSchema[];
    onRemoveExercise: (index: number) => void;
}
const ExerciseField = ({ index, control, exercises, onRemoveExercise }: ExerciseFieldProps) => {
    return (
        <div className="flex gap-2 items-center">
            <FormField
                control={control}
                name={`exercisesIds.${index}`}
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select an exercise" />
                                </SelectTrigger>
                                <SelectContent>
                                    {exercises.map((exercise) => (
                                        <SelectItem key={exercise.id} value={exercise.id}>
                                            {exercise.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="button" variant="destructive" size="icon" onClick={() => onRemoveExercise(index)} aria-label="Remove exercise" >
                <Trash />
            </Button>
        </div>
    )
}

const AddExerciseButton = ({onAddExercises, disableAdd}: {onAddExercises: () => void, disableAdd: boolean}) => {
    return (
        <Button type="button" variant="outline" size="fit" disabled={disableAdd}
            onClick={(event) => { event.preventDefault(); onAddExercises(); }}
        >
            <Plus /> Add Exercise
        </Button>
    )
}

const SubmitButton = ({isPending, text}: {isPending: boolean, text: string}) => {
    return (
        <Button type="submit" size="fit" disabled={isPending}>
            {isPending ? <span className='flex items-center gap-2 font-semibold'><Spinner /> Saving...</span> : <span className="font-semibold">{text}</span>}
        </Button>
    )    
}