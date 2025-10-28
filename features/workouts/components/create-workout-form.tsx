'use client'

import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateWorkoutFormInput, createWorkoutSchema } from "@/features/workouts/schemas/workout";
import { createWorkout } from "@/features/workouts/actions/workouts";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { useCreateModule } from "@/hooks/use-create-module";


const CreateWorkoutForm = () => {

    const { mutate, isPending } = useCreateModule({
        name: "Workout",
        createFn: createWorkout,
        queryKey: ["get-user-workouts"]
    })
    
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
