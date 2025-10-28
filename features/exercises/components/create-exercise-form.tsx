'use client'

import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateExerciseFormInput, createExerciseSchema, transformedCreateExerciseSchema } from "@/features/exercises/schemas/zod";
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
            sets: "3",
            minReps: "10",
            maxReps: "15",
        },
    })

    function onSubmit(values: CreateExerciseFormInput) {
        const parsed = transformedCreateExerciseSchema.parse(values)
        mutate(parsed)
    }

    const FormFields: {
        name: keyof CreateExerciseFormInput
        label: string
        type: string
        placeholder: string
    }[]  = [
        { name: "name", label: "Name", placeholder: "Add Exercise Name", type: "text" },
        { name: "sets", label: "Sets", placeholder: "Add number of sets", type: "number" },
        { name: "minReps", label: "Min Reps", placeholder: "Add number of min reps", type: "number" },
        { name: "maxReps", label: "Max Reps", placeholder: "Add number of max reps", type: "number" },
    ]
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mb-8">
            <div className='flex flex-col items-center w-full gap-4'>
                {FormFields.map((fieldInfo) => (
                    <FormField
                        control={form.control}
                        name={fieldInfo.name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fieldInfo.label}</FormLabel>
                                <FormControl>
                                    <Input type={fieldInfo.type} placeholder={fieldInfo.placeholder} {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}



                <Button type="submit" disabled={isPending}  className="w-full mt-3">
                    {isPending ? <span className='flex items-center gap-2'><Spinner /> Saving...</span> : <span>Create Exercise</span>}
                </Button>
            </div>
            </form>
        </Form>
    );
}

export default CreateExerciseForm
