'use client'

import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useSetActivePlan } from "../hooks/use-set-active-plan";
import DrawerButton from "@/components/drawer-button";
import UpdatePlanForm from "./update-plan-form";
import { WorkoutSchema } from "@/features/workouts/schemas/zod";
import LoadingPage from "@/components/loading-page";
import { useDeleteModule } from "@/hooks/use-delete-module";
import { deletePlan } from "../actions/plans";
import { PlanSchema } from "../schemas/plan";

interface PlansListProps {
    workouts: WorkoutSchema[]
    plans: PlanSchema[]
    isLoadingPlans: boolean
    errorPlans: Error | null
}

const PlansList = ({workouts, plans, isLoadingPlans, errorPlans}: PlansListProps) => {

    if (isLoadingPlans) return <LoadingPage/>
    if (errorPlans) return <div className="flex items-center justify-center w-full h-svh"><p>Error loading plans</p></div>
        
    return ( 
        <div className="flex flex-col gap-4 justify-center ">
            <div className="flex flex-col gap-2">
                {plans.length === 0 && (
                    <p className="text-center">No plans found</p>
                )}
                {plans.map((plan: PlanSchema) => (
                    <Plan plan={plan} workouts={workouts}
                    />
                ))}
            </div>
        </div>
     );
}
 
export default PlansList;

export const Plan = ({plan, workouts}: {plan: PlanSchema, workouts: WorkoutSchema[]}) => {
    const { mutate: deletePlanAction, isPending: isDeleting } = useDeleteModule({
        name: "Plan",
        deleteFn: deletePlan,
        queryKey: ["get-user-plans"]
    })
    const { mutate: setActivePlan, isPending: isSettingActive } = useSetActivePlan()

    const handleSetAsActivePlan = (planId: string) => {
        setActivePlan(planId)
    }
  
    const handleDeletePlan = (planId: string) => {
        if (confirm('Are you sure you want to delete this plan?')) {
            deletePlanAction(planId)
        }
    }
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
        <div key={plan.id} className="flex items-center justify-between bg-[#20321B] p-4 rounded-lg">
            <div className="flex flex-col">
                <h3 className="font-semibold mb-0.5">{plan.name}</h3>
                <p className="text-xs text-neutral-300">{workoutDays} workout {workoutDays === 1 ? 'day' : 'days'} per week</p>
            </div>
            <div className="flex gap-2">
                <Button  size="sm" variant={plan.isActive ? 'secondary' : 'default'} disabled={plan.isActive || isSettingActive} 
                    onClick={() => handleSetAsActivePlan(plan.id)}
                >{plan.isActive ? 'Active' : 'Activate'}</Button>
                <DrawerButton
                    title="Update Plan"
                    formComponent={<UpdatePlanForm plan={plan} workouts={workouts} />}
                >
                    <Button size="sm" variant='secondary'><Pencil /></Button>
                </DrawerButton>
                
                <Button size="sm" variant="destructive" disabled={isDeleting}
                    onClick={() => handleDeletePlan(plan.id)} 
                ><Trash /></Button>
            </div>
        </div>
    )
}