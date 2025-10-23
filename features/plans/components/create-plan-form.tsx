'use client'

import { Form, FormDescription, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { addPlanSchema } from "@/schemas/zod/plan";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddPlan } from "@/features/plans/hooks/use-add-plan";
import { AddPlanFormInput } from "@/schemas/zod/plan";

const CreatePlanForm = () => {

    const { mutate, isPending } = useAddPlan()

    const form = useForm<AddPlanFormInput>({
        resolver: zodResolver(addPlanSchema),
        defaultValues: {
            name: "",
        },
    })

    function onSubmit(values: AddPlanFormInput) {
        const parsed = addPlanSchema.parse(values)
        mutate(parsed)
    }
    
    return (
        <div className="container max-w-2xl flex flex-col gap-2 items-center p-4">
            <h2 className="text-xl font-bold">Create New Plan</h2>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Plan Name" {...field} />
                                </FormControl>
                                <FormDescription>add proficional name of your plan.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending}  className="w-full mt-3">
                            {isPending ? <span className='flex items-center gap-2'><Spinner /> Saving...</span> : <span>Create Plan</span>}
                        </Button>
                    </form>
                </Form>
            </div>
        </div> 
    )
}
export default CreatePlanForm