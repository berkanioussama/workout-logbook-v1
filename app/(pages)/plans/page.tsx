'use client'

import PlansList from "@/features/plans/components/plans-list";
import CreatePlanButton from "@/features/plans/components/create-plan-button";
import { Plus } from "lucide-react";

const Plans = () => {
    return (
        <div className="flex flex-col w-full min-h-svh">
            <div className="container p-4 max-w-2xl flex flex-col gap-4 justify-center ">
                <h2 className="text-xl font-bold text-center">Plans</h2>
                <div className="flex flex-col gap-2">
                    <CreatePlanButton><Plus className="w-4 h-4"/>Create Plan</CreatePlanButton>
                </div>
            </div>
            <PlansList/>
        </div>
    );
}
 
export default Plans;