'use client'

import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import CreateWorkoutForm from "./create-workout-form";
import { ScrollArea } from "@/components/ui/scroll-area";

const CreateWorkoutButton = ({children}: {children: React.ReactNode}) => {
    return (
        <Drawer>
            <DrawerTrigger className="flex items-center justify-center gap-2 bg-neutral-800 px-2 py-2 rounded-md font-semibold cursor-pointer">
                {children}
            </DrawerTrigger>
            <DrawerContent className="bg-neutral-900 flex flex-col items-center">
                <ScrollArea className="h-[80vh] w-full">
                    <DrawerTitle className="text-center text-white text-xl font-bold mt-2">Create New Workout</DrawerTitle>
                    <CreateWorkoutForm/>
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}

export default CreateWorkoutButton
