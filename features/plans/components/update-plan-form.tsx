'use client'

import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AddPlanFormInput, PlanDaysFormInput, PlanSchema, UpdatePlanFormInput, updatePlanSchema } from "@/features/plans/schemas/plan";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePlan } from "@/features/plans/hooks/use-update-plan";


// Then update your DAYS_OF_WEEK to use the correct type
const DAYS_OF_WEEK: { name: keyof AddPlanFormInput; label: string }[] = [
  { name: 'sundayWorkoutId', label: 'Sunday' },
  { name: 'mondayWorkoutId', label: 'Monday' },
  { name: 'tuesdayWorkoutId', label: 'Tuesday' },
  { name: 'wednesdayWorkoutId', label: 'Wednesday' },
  { name: 'thursdayWorkoutId', label: 'Thursday' },
  { name: 'fridayWorkoutId', label: 'Friday' },
  { name: 'saturdayWorkoutId', label: 'Saturday' },
];

const userWorkouts = [
    { id: '1', name: 'Chest Day' },
    { id: '2', name: 'Leg Day' },
  ]

const UpdatePlanForm = ({plan}: {plan: PlanSchema}) => {

    const { mutate, isPending } = useUpdatePlan()

    const form = useForm<UpdatePlanFormInput>({
        resolver: zodResolver(updatePlanSchema),
        defaultValues: {
            name: plan.name,
            isActive: plan.isActive,
            sundayWorkoutId: plan.sundayWorkoutId || "rest-day",
            mondayWorkoutId: plan.mondayWorkoutId || "rest-day",
            tuesdayWorkoutId: plan.tuesdayWorkoutId || "rest-day",
            wednesdayWorkoutId: plan.wednesdayWorkoutId || "rest-day",
            thursdayWorkoutId: plan.thursdayWorkoutId || "rest-day",
            fridayWorkoutId: plan.fridayWorkoutId || "rest-day",
            saturdayWorkoutId: plan.saturdayWorkoutId || "rest-day",
        },
    })

    function onSubmit(values: UpdatePlanFormInput) {
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
        const data = {
            ...cleanedValues,
            id: plan.id,
            isActive: cleanedValues.isActive ?? false
        };

        mutate(data);
    }
    
    return (
        <div className="container max-w-2xl mx-auto flex flex-col gap-2 items-center p-4">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mb-8">
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
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mt-4">
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
                                    {userWorkouts.map((workout) => (
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
                        {isPending ? <span className='flex items-center gap-2'><Spinner /> Saving...</span> : <span>Update Plan</span>}
                    </Button>
                </form>
            </Form>
        </div> 
    )
}
export default UpdatePlanForm