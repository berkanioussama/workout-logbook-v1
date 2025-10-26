'use client'

import PlansList from "@/features/plans/components/plans-list";
import CreatePlanButton from "@/features/plans/components/create-plan-button";

const Plans = () => {
    return (
        <div className="flex flex-col items-center w-full min-h-svh">
            <CreatePlanButton/>
            <PlansList/>
        </div>
    );
}
 
export default Plans;