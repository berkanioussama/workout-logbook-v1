'use client'

import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateExerciseFormInput, createExerciseSchema } from "@/features/exercises/schemas/zod";
import { createExercise } from "@/features/exercises/actions/exercises";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { useCreateModule } from "@/hooks/use-create-module";


const CreateExerciseForm = () => {

    const { mutate, isPending } = useCreateModule({
        name: "Exercise",
        createFn: createExercise,
        queryKey: ["get-user-exercises"]
    })
    
    const form = useForm<CreateExerciseFormInput>({
        resolver: zodResolver(createExerciseSchema),
        defaultValues: {
            name: "",
        },
    })

    function onSubmit(values: CreateExerciseFormInput) {
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
                                <Input placeholder="Add Exercise Name" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isPending}  className="w-full mt-3">
                    {isPending ? <span className='flex items-center gap-2'><Spinner /> Saving...</span> : <span>Create Exercise</span>}
                </Button>
            </form>
        </Form>
    );
}

export default CreateExerciseForm
