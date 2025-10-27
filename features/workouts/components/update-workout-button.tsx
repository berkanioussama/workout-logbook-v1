'use client'

import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import UpdateWorkoutForm from "./update-workout-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WorkoutSchema } from "../schemas/workout";

interface UpdateWorkoutButtonProps {
    workout: WorkoutSchema
    children: React.ReactNode
}

const UpdateWorkoutButton = ({workout, children}: UpdateWorkoutButtonProps) => {
    return (
        <Drawer>
            <DrawerTrigger className="flex items-center justify-center gap-2cursor-pointer">
                {children}
            </DrawerTrigger>
            <DrawerContent className="bg-neutral-900 flex flex-col items-center">
                <ScrollArea className="h-[80vh] w-full">
                    <DrawerTitle className="text-center text-white text-xl font-bold mt-2">Update Workout</DrawerTitle>
                    <UpdateWorkoutForm workout={workout} />
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}

export default UpdateWorkoutButton
