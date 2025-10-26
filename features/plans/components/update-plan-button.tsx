'use client'

import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import UpdatePlanForm from "./update-plan-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlanSchema } from "../schemas/plan";

interface UpdatePlanButtonProps {
    plan: PlanSchema
    children: React.ReactNode
}

const UpdatePlanButton = ({plan, children}: UpdatePlanButtonProps) => {
    return (
        <Drawer>
            <DrawerTrigger className="flex items-center justify-center gap-2cursor-pointer">
                {children}
            </DrawerTrigger>
            <DrawerContent className="bg-neutral-900 flex flex-col items-center">
                <ScrollArea className="h-[80vh] w-full">
                    <DrawerTitle className="text-center text-white text-xl font-bold mt-2">Update Plan</DrawerTitle>
                    <UpdatePlanForm plan={plan} />
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}

export default UpdatePlanButton
