'use client'

import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateWorkoutFormInput, createWorkoutSchema } from "@/features/workouts/schemas/workout";
import { useCreateWorkout } from "@/features/workouts/hooks/use-create-workout";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";


const CreateWorkoutForm = () => {

    const { mutate, isPending } = useCreateWorkout()
    
    const form = useForm<CreateWorkoutFormInput>({
        resolver: zodResolver(createWorkoutSchema),
        defaultValues: {
            name: "",
        },
    })

    function onSubmit(values: CreateWorkoutFormInput) {
        mutate(values);
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
                                <Input placeholder="Add Workout Name" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}  className="w-full mt-3">
                    {isPending ? <span className='flex items-center gap-2'><Spinner /> Saving...</span> : <span>Create Workout</span>}
                </Button>
            </form>
        </Form>
    );
}

export default CreateWorkoutForm
