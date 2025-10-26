'use client'

import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Plus } from "lucide-react";
import CreatePlanForm from "./create-plan-form";
import { ScrollArea } from "@/components/ui/scroll-area";

const CreatePlanButton = () => {
    return (
        <div className="w-full flex flex-col gap-2 items-center">
            <div className="container p-4 max-w-2xl flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-center">Quick Start</h2>
                <Drawer>
                    <DrawerTrigger className="flex items-center justify-center gap-2 bg-neutral-800 px-2 py-2 rounded-md font-semibold cursor-pointer">
                        <Plus/>
                        Create New Plan
                    </DrawerTrigger>
                    <DrawerContent className="bg-neutral-900 flex flex-col items-center">
                        <ScrollArea className="h-[80vh] w-full">
                            <DrawerTitle className="text-center text-white text-xl font-bold mt-2">Create New Plan</DrawerTitle>
                            <CreatePlanForm/>
                        </ScrollArea>
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    );
}

export default CreatePlanButton
