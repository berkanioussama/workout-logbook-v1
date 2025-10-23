'use client'

import { useGetUserPlans } from "@/features/plans/hooks/use-get-user-plans";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

const PlansList = () => {


    const { data: plans, isLoading, error } = useGetUserPlans()

    if (isLoading) return <div className="flex gap-2 items-center justify-center w-full h-svh"><Spinner /><p>Loading...</p></div>
    if (error) return <div className="flex items-center justify-center w-full h-svh"><p>Error loading user info</p></div>
        
    return ( 
        <div className="container p-4 max-w-2xl flex flex-col gap-4 justify-center ">
            <h2 className="text-xl font-bold">Plans List</h2>
            <div className="flex flex-col gap-2">
                {plans.map((plan: any) => (
                    <div key={plan.id} className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{plan.name}</h3>
                        <Button>Set as active plan</Button>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default PlansList;