'use client'

import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlanDaysFormInput, addPlanSchema } from "@/features/plans/schemas/plan";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddPlanFormInput } from "@/features/plans/schemas/plan";
import { WorkoutSchema } from "@/features/workouts/schemas/workout";
import { DAYS_OF_WEEK } from "@/features/plans/schemas/types";
import { useCreateModule } from "@/hooks/use-create-module";
import { addPlan } from "../actions/plans";

const CreatePlanForm = ({workouts}: {workouts: WorkoutSchema[]}) => {

    const { mutate, isPending } = useCreateModule({
        name: "Plan",
        createFn: addPlan,
        queryKey: ["get-user-plans"]
    })

    const form = useForm<AddPlanFormInput>({
        resolver: zodResolver(addPlanSchema),
        defaultValues: {
            name: "",
            isActive: false,
            sundayWorkoutId: "rest-day",
            mondayWorkoutId: "rest-day",
            tuesdayWorkoutId: "rest-day",
            wednesdayWorkoutId: "rest-day",
            thursdayWorkoutId: "rest-day",
            fridayWorkoutId: "rest-day",
            saturdayWorkoutId: "rest-day",
        },
    })

    function onSubmit(values: AddPlanFormInput) {
        const cleanedValues = { ...values };
    
        const workoutDays = [
            'sundayWorkoutId',
            'mondayWorkoutId',
            'tuesdayWorkoutId',
            'wednesdayWorkoutId',
            'thursdayWorkoutId',
            'fridayWorkoutId',
            'saturdayWorkoutId'
        ] as const;

        workoutDays.forEach(day => {
            if (cleanedValues[day] === 'rest-day') {
                delete cleanedValues[day];
            }
        });

        mutate(cleanedValues);
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
                                <Input placeholder="Add Plan Name" {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border px-4 py-3 mt-4">
                        <FormLabel className="text-base">Set as Active Plan</FormLabel>
                        <FormControl>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                    )}
                />
                
                <div className="space-y-4 mt-4">
                    {DAYS_OF_WEEK.map((day) => (
                    <FormField
                        key={day.name}
                        control={form.control}
                        name={day.name as keyof PlanDaysFormInput}
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>{day.label}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value || "rest-day"}>
                            <FormControl>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a workout"/>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="rest-day">Rest Day</SelectItem>
                                {workouts.map((workout) => (
                                <SelectItem key={workout.id} value={workout.id}>
                                    {workout.name}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    ))}
                </div>

                <Button type="submit" disabled={isPending}  className="w-full mt-3">
                    {isPending ? <span className='flex items-center gap-2'><Spinner /> Saving...</span> : <span>Create Plan</span>}
                </Button>
            </form>
        </Form>
    )
}
export default CreatePlanForm