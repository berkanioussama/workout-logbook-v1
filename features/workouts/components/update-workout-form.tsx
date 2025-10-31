'use client'

import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateWorkoutFormInput, updateWorkoutSchema } from "@/features/workouts/schemas/zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { WorkoutSchema } from "../schemas/zod";
import { ExerciseSchema } from "@/features/exercises/schemas/zod";
import { useUpdateModule } from "@/hooks/use-update-module";
import { updateWorkout, getWorkoutExercises } from "../actions/workouts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import { useGetModule } from "@/hooks/use-get-module";
import { useEffect } from "react";

const UpdateWorkoutForm = ({ workout, exercises }: { workout: WorkoutSchema, exercises: ExerciseSchema[] }) => {
    const { mutate, isPending } = useUpdateModule({
        name: "Workout",
        updateFn: updateWorkout,
        queryKey: ["get-user-workouts"]
    });

    const { data: workoutExercises, isLoading, error } = useGetModule({
        queryFn: () => getWorkoutExercises(workout.id),
        queryKey: ['get-workout-exercises', workout.id],
    });

    const form = useForm<UpdateWorkoutFormInput>({
        resolver: zodResolver(updateWorkoutSchema),
        defaultValues: {
            name: workout.name,
            exercisesIds: [] as string[],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "exercisesIds"
    });

    useEffect(() => {
        if (workoutExercises?.length && fields.length === 0) {
            workoutExercises.forEach((we: { exerciseId: string }) => {
            append(we.exerciseId);
        });
    }
}, [workoutExercises, fields]);

    function onSubmit(values: UpdateWorkoutFormInput) {
        const data = {
            ...values,
            id: workout.id,
        };
        mutate(data);
    }

    if (isLoading) {
        return <div className="flex justify-center p-4"><Spinner /></div>;
    }
    if (!workoutExercises) {
        return <div className="flex justify-center p-4"><p>No exercises found</p></div>;
    }
    if (error) {
        return <div className="flex justify-center p-4"><p>Error fetching exercises</p></div>;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mb-8">
                <WorkoutFields form={form} />
                <div className="flex flex-col gap-3 mt-4">
                    <h3 className="text-lg font-semibold">Exercises</h3>
                    <ExercisesFields 
                        form={form} 
                        exercises={exercises} 
                        fields={fields} 
                        onRemove={remove} 
                    />
                    <AddExerciseButton 
                        onClick={() => exercises.length > 0 && append(exercises[0].id)}
                        disabled={exercises.length === 0}
                    />
                </div>
                <UpdateWorkoutButton isPending={isPending} />
            </form>
        </Form>
    );
}

export default UpdateWorkoutForm;

const AddExerciseButton = ({ onClick, disabled }: { onClick: () => void, disabled: boolean }) => {
    return (
        <Button 
            variant="outline" 
            size="fit" 
            disabled={disabled}
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
        >
            <Plus /> Add Exercise
        </Button>
    );
}

const UpdateWorkoutButton = ({ isPending }: { isPending: boolean }) => {
    return (
        <Button type="submit" disabled={isPending} className="w-full mt-4">
            {isPending ? (
                <span className='flex items-center gap-2 font-semibold'>
                    <Spinner /> Updating...
                </span>
            ) : (
                <span className="font-semibold">Update Workout</span>
            )}
        </Button>
    );
}

const WorkoutFields = ({ form }: { form: any }) => {
    return (
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Update Workout Name" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

interface ExercisesFieldsProps {
    form: any;
    exercises: ExerciseSchema[];
    fields: { id: string }[];
    onRemove: (index: number) => void;
}

const ExercisesFields = ({ form, exercises, fields, onRemove }: ExercisesFieldsProps) => {
    return (
        <div className="space-y-2">
            {fields.map((field, index) => {
                const fieldValue = form.watch(`exercisesIds.${index}`);
                const exercise = exercises.find(e => e.id === fieldValue);
                
                return (
                    <div key={field.id} className="flex items-center gap-2">
                        <FormField
                            control={form.control}
                            name={`exercisesIds.${index}`}
                            render={({ field: formField }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Select
                                            value={formField.value}
                                            onValueChange={formField.onChange}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder={exercise?.name || "Select an exercise"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {exercises.map((ex) => (
                                                    <SelectItem 
                                                        key={ex.id} 
                                                        value={ex.id}
                                                    >
                                                        {ex.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button 
                            type="button" 
                            variant="destructive" 
                            size="icon"
                            onClick={() => onRemove(index)}
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                );
            })}
        </div>  
    );
}