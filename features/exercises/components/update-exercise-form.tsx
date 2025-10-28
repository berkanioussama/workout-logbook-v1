'use client'

import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateExerciseFormInput, updateExerciseSchema } from "@/features/exercises/schemas/zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { ExerciseSchema } from "../schemas/zod";
import { useUpdateModule } from "@/hooks/use-update-module";
import { updateExercise } from "../actions/exercises";


const UpdateExerciseForm = ({exercise}: {exercise: ExerciseSchema}) => {

    const { mutate, isPending } = useUpdateModule({
        name: "Exercise",
        updateFn: updateExercise,
        queryKey: ["get-user-exercises"]
    })
    
    const form = useForm<UpdateExerciseFormInput>({
        resolver: zodResolver(updateExerciseSchema),
        defaultValues: {
            name: exercise.name,
        },
    })

    function onSubmit(values: UpdateExerciseFormInput) {
        const data = {
            ...values,
            id: exercise.id,
        };
        mutate(data);
    }
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Update Exercise Name" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}  className="w-full mt-3">
                    {isPending ? <span className='flex items-center gap-2'><Spinner /> Updating...</span> : <span>Update Exercise</span>}
                </Button>
            </form>
        </Form>
    );
}

export default UpdateExerciseForm
