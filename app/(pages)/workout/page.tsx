'use client'

import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import CreatePlanForm from "@/features/plans/components/create-plan-form";
import PlansList from "@/features/plans/components/plans-list";

const Workout = () => {
    return ( 
        <div className="flex items-center justify-center w-full min-h-svh">
            <div className="container px-4 max-w-2xl flex flex-col gap-4 items-center justify-center ">
                <CreatePlan/>
                <Plans />
                <MyWorkouts/>
            </div>
        </div> 
    );
}
 
export default Workout;

const CreatePlan = () => {
    return (
        <div className="w-full flex flex-col gap-2">
            <h2 className="text-xl font-bold">Quick Start</h2>
            <Drawer>
                <DrawerTrigger className="flex items-center justify-center gap-2 bg-neutral-800 px-2 py-2 rounded-md font-semibold cursor-pointer">
                        <Plus/>
                        Create New Plan
                </DrawerTrigger>
                <DrawerContent className="bg-neutral-800 flex flex-col items-center">
                    <DrawerTitle></DrawerTitle>
                    <CreatePlanForm/>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

const Plans = () => {
    return (
        <div className="w-full flex flex-col gap-2">
            <h2 className="text-xl font-bold">Plans</h2>
            <Drawer>
                <DrawerTrigger className="flex items-center justify-center gap-2 bg-neutral-800 px-2 py-2 rounded-md font-semibold cursor-pointer">

                        <Search/>
                        Explore Plans
                </DrawerTrigger>
                <DrawerContent className="bg-neutral-800 flex flex-col items-center">
                    <DrawerTitle></DrawerTitle>
                    <PlansList/>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

const MyWorkouts = () => {
    return (
        <div className="w-full flex flex-col gap-2">
            <h2 className="text-xl font-bold">My Workouts (11)</h2>
        </div>
    );
}