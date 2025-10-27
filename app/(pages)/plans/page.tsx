'use client'

import PlansList from "@/features/plans/components/plans-list";
import { Plus } from "lucide-react";
import DrawerButton from "@/components/drawer-button";
import CreatePlanForm from "@/features/plans/components/create-plan-form";
import { Button } from "@/components/ui/button";
import { useGetUserWorkouts } from "@/features/workouts/hooks/use-get-user-workouts";

const Plans = () => {
    const { data: workouts } = useGetUserWorkouts()
    return (
        <div className="flex flex-col w-full min-h-svh">
            <h2 className="text-xl font-bold text-center">Plans</h2>
            <DrawerButton
                title="Create New Plan"
                formComponent={<CreatePlanForm workouts={workouts} />}
            >
                <Button size='lg'><Plus /> Create New Plan</Button>
            </DrawerButton>
            <PlansList workouts={workouts}/>
        </div>
    );
}
 
export default Plans;