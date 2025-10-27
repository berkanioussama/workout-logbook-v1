'use client'

import PlansList from "@/features/plans/components/plans-list";
import { Plus } from "lucide-react";
import DrawerButton from "@/components/drawer-button";
import CreatePlanForm from "@/features/plans/components/create-plan-form";
import { Button } from "@/components/ui/button";

const Plans = () => {
    return (
        <div className="flex flex-col w-full min-h-svh">
            <h2 className="text-xl font-bold text-center">Plans</h2>
            <DrawerButton
                title="Create New Plan"
                formComponent={<CreatePlanForm />}
            >
                <Button size='lg'><Plus /> Create New Plan</Button>
            </DrawerButton>
            <PlansList/>
        </div>
    );
}
 
export default Plans;