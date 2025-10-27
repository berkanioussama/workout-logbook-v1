'use client'

import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateWorkoutFormInput, updateWorkoutSchema } from "@/features/workouts/schemas/workout";
import { useUpdateWorkout } from "@/features/workouts/hooks/use-update-workout";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { WorkoutSchema } from "../schemas/workout";


const UpdateWorkoutForm = ({workout}: {workout: WorkoutSchema}) => {

    const { mutate, isPending } = useUpdateWorkout()
    
    const form = useForm<UpdateWorkoutFormInput>({
        resolver: zodResolver(updateWorkoutSchema),
        defaultValues: {
            name: workout.name,
        },
    })

    function onSubmit(values: UpdateWorkoutFormInput) {
        const data = {
            ...values,
            id: workout.id,
        };
        mutate(data);
    }
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mb-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Update Workout Name" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}  className="w-full mt-3">
                    {isPending ? <span className='flex items-center gap-2'><Spinner /> Updating...</span> : <span>Update Workout</span>}
                </Button>
            </form>
        </Form>
    );
}

export default UpdateWorkoutForm
