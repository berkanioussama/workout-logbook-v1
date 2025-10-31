'use client'

import { ExerciseSchema } from "@/features/exercises/schemas/zod";
import { useCreateModule } from "@/hooks/use-create-module";
import { createWorkout } from "@/features/workouts/actions/workouts";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkoutSchema, CreateWorkoutFormInput } from "@/features/workouts/schemas/zod";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Plus, Trash } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CreateWorkoutForm = ({ exercises }: { exercises: ExerciseSchema[] }) => {

    const { mutate, isPending } = useCreateModule({ name: "Workout", createFn: createWorkout, queryKey: ["get-user-workouts"] })

    const form = useForm<CreateWorkoutFormInput>({
        resolver: zodResolver(createWorkoutSchema),
        defaultValues: { name: "", exercisesIds: [] },
    })

    const { fields, append, remove } = useFieldArray({ control: form.control, name: "exercisesIds" });

    const onSubmit = (values: CreateWorkoutFormInput) => mutate(values);

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                <WorkoutFields control={form.control}/>

                <ExercisesFields 
                    control={form.control}
                    fields={fields}
                    exercises={exercises}
                    onAddExercises={() => append(exercises[0]?.id || "")}
                    onRemoveExercise={remove}
                    disableAdd={!exercises.length}
                />
                
                <SubmitButton isPending={isPending} text="Create Workout" />
            </form>
        </Form>
    )
}

export default CreateWorkoutForm

const WorkoutFields = ({control}: {control: Control<CreateWorkoutFormInput>}) => {
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
    control: Control<CreateWorkoutFormInput>;
    exercises: ExerciseSchema[];
    fields: { id: string }[];
    onAddExercises: () => void;
    onRemoveExercise: (index: number) => void;
    disableAdd: boolean;
}
const ExercisesFields = ({ control, exercises, fields, onAddExercises, onRemoveExercise, disableAdd }: ExercisesFieldsProps) => {
    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold">Exercises</h3>
            <div className="space-y-3">
                {fields.map((field, index) => (
                    <ExerciseField key={field.id} index={index} control={control} exercises={exercises} onRemoveExercise={onRemoveExercise} />
                ))}
                <AddExerciseButton onAddExercises={onAddExercises} disableAdd={disableAdd} />
            </div>
        </div>
    )
}

interface ExerciseFieldProps {
    index: number;
    control: Control<CreateWorkoutFormInput>;
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
