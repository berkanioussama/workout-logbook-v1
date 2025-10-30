'use client'

import PlansList from "@/features/plans/components/plans-list";
import { Plus, Pencil } from "lucide-react";
import DrawerButton from "@/components/drawer-button";
import FloatDrawerButton from "@/components/float-drawer-button";
import CreatePlanForm from "@/features/plans/components/create-plan-form";
import { Button } from "@/components/ui/button";
import { useGetModule } from "@/hooks/use-get-module";
import { getWorkouts } from "@/features/workouts/actions/workouts";
import { getPlans } from "@/features/plans/actions/plans";
import { PlanSchema } from "@/features/plans/schemas/plan";
import { WorkoutSchema } from "@/features/workouts/schemas/zod";
import UpdatePlanForm from "@/features/plans/components/update-plan-form";

interface PlansProps {
    plans: PlanSchema[]
    isLoadingPlans: boolean
    errorPlans: Error | null
    workouts: WorkoutSchema[]   
}

const Plans = () => {

    const { data: workouts } = useGetModule({ queryFn: getWorkouts, queryKey: ['get-user-workouts'] })
    const { data: plans, isLoading: isLoadingPlans, error: errorPlans} = useGetModule({ queryFn: getPlans, queryKey: ['get-user-plans'] })
    const activePlan = plans?.find((plan: PlanSchema) => plan.isActive)

    return (
        <div className="flex flex-col w-full min-h-svh">

            <ActivePlan plan={activePlan} workouts={workouts}/>
            <AllPlans plans={plans} isLoadingPlans={isLoadingPlans} errorPlans={errorPlans} workouts={workouts}/>
            <FloatDrawerButton
                title="Create New Plan"
                formComponent={<CreatePlanForm workouts={workouts} />}
            />
        </div>
    );
}
 
export default Plans;

export const ActivePlan = ({plan, workouts}: {plan: PlanSchema | undefined, workouts: WorkoutSchema[]}) => {
    const countWorkoutDays = (plan: PlanSchema) => {
        const days = [
            plan.sundayWorkoutId,
            plan.mondayWorkoutId,
            plan.tuesdayWorkoutId,
            plan.wednesdayWorkoutId,
            plan.thursdayWorkoutId,
            plan.fridayWorkoutId,
            plan.saturdayWorkoutId
        ];
        return days.filter(day => day).length;
    };
    const workoutDays = plan ? countWorkoutDays(plan) : 0;
    return (
        <div className="container p-4 flex gap-2 flex-col">
            <h2 className="text-lg font-bold">Active Plan</h2>
            <div className="p-4 bg-[#20321B] rounded-lg">
                {plan && (
                <div className="flex gap-2 justify-between">
                    <div>
                        <h4 className="font-semibold mb-0.5">{plan.name}</h4>
                        <p className="text-xs text-neutral-300">
                            {workoutDays} workout {workoutDays === 1 ? 'day' : 'days'} per week
                        </p>
                    </div>
                    <DrawerButton
                        title="Update Plan"
                        formComponent={<UpdatePlanForm plan={plan} workouts={workouts} />}  
                    >
                    <Button size="icon"><Pencil /></Button>
                </DrawerButton>
                </div>
                )}
                {!plan && (
                    <p className="text-sm">No active plan found</p>
                )}
            </div>
        </div>
    );
}

export const AllPlans = ({plans, isLoadingPlans, errorPlans, workouts}: PlansProps) => {
    return (
        <div className="container p-4 flex gap-2 flex-col">
            <h2 className="text-lg font-bold">All Plans</h2>
            <PlansList plans={plans} isLoadingPlans={isLoadingPlans} errorPlans={errorPlans} workouts={workouts}/>
        </div>  
    );
}