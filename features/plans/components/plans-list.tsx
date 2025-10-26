'use client'

import { useGetUserPlans } from "@/features/plans/hooks/use-get-user-plans";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useDeletePlan } from "@/features/plans/hooks/use-delete-plan";
import { Eye, Pencil, Trash } from "lucide-react";
import UpdatePlanButton from "./update-plan-button";

const PlansList = () => {

    const { data: plans, isLoading, error } = useGetUserPlans()
    const { mutate: deletePlan, isPending: isDeleting } = useDeletePlan()

    const handleSetAsActivePlan = (planId: string) => {
        
    }
  
    const handleDeletePlan = (planId: string) => {
        if (confirm('Are you sure you want to delete this plan?')) {
            deletePlan(planId)
        }
    }

    if (isLoading) return <div className="flex gap-2 items-center justify-center w-full h-svh"><Spinner /><p>Loading plans...</p></div>
    if (error) return <div className="flex items-center justify-center w-full h-svh"><p>Error loading plans</p></div>
        
    return ( 
        <div className="container p-4 max-w-2xl flex flex-col gap-4 justify-center ">
            <h2 className="text-2xl font-bold text-center">Plans List</h2>
            <div className="flex flex-col gap-2">
                {plans.length === 0 && (
                    <p className="text-center">No plans found</p>
                )}
                {plans.map((plan: any) => (
                    <div key={plan.id} className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{plan.name}</h3>
                        <div className="flex gap-3">
                            <Button size="sm" variant={plan.isActive ? 'secondary' : 'default'} disabled={plan.isActive} onClick={() => handleSetAsActivePlan(plan.id)}>{plan.isActive ? 'Active' : 'Set as active'}</Button>
                            <Button size="sm"><Eye /></Button>
                            <UpdatePlanButton plan={plan}>
                                <Button size="sm"><Pencil /></Button>
                            </UpdatePlanButton>
                            
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