'use client'

import { useGetUserPlans } from "@/features/plans/hooks/use-get-user-plans";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useDeletePlan } from "@/features/plans/hooks/use-delete-plan";
import { Eye, Pencil, Trash } from "lucide-react";
import { useSetActivePlan } from "../hooks/use-set-active-plan";
import DrawerButton from "@/components/drawer-button";
import UpdatePlanForm from "./update-plan-form";
import { WorkoutSchema } from "@/features/workouts/schemas/workout";
import LoadingPage from "@/components/loading-page";

const PlansList = ({workouts}: {workouts: WorkoutSchema[]}) => {

    const { data: plans, isLoading, error } = useGetUserPlans()
    const { mutate: deletePlan, isPending: isDeleting } = useDeletePlan()
    const { mutate: setActivePlan, isPending: isSettingActive } = useSetActivePlan()

    const handleSetAsActivePlan = (planId: string) => {
        setActivePlan(planId)
    }
  
    const handleDeletePlan = (planId: string) => {
        if (confirm('Are you sure you want to delete this plan?')) {
            deletePlan(planId)
        }
    }

    if (isLoading) return <LoadingPage/>
    if (error) return <div className="flex items-center justify-center w-full h-svh"><p>Error loading plans</p></div>
        
    return ( 
        <div className="container p-4 max-w-2xl flex flex-col gap-4 justify-center ">
            <h2 className="text-xl font-bold text-center">My Plans</h2>
            <div className="flex flex-col gap-2">
                {plans.length === 0 && (
                    <p className="text-center">No plans found</p>
                )}
                {plans.map((plan: any) => (
                    <div key={plan.id} className="flex items-center justify-between">
                        <h3 className="font-semibold">{plan.name}</h3>
                        <div className="flex gap-2">
                            <Button size="sm" variant={plan.isActive ? 'secondary' : 'default'} disabled={plan.isActive || isSettingActive} 
                                onClick={() => handleSetAsActivePlan(plan.id)}
                            >{plan.isActive ? 'Active' : 'Set active'}</Button>
                            <Button size="sm"><Eye /></Button>
                            <DrawerButton
                                title="Update Plan"
                                formComponent={<UpdatePlanForm plan={plan} workouts={workouts} />}
                            >
                                <Button size="sm"><Pencil /></Button>
                            </DrawerButton>
                            
                            <Button size="sm" variant="destructive" disabled={isDeleting}
                                onClick={() => handleDeletePlan(plan.id)} 
                            ><Trash /></Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default PlansList;