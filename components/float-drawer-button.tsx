'use client'

import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";
import { Plus } from "lucide-react";

interface FloatDrawerButtonProps {
    title: string;
    formComponent: ReactNode;
    contentClassName?: string;
}

const FloatDrawerButton = ({ 
  title, 
  formComponent,
  contentClassName = "bg-main-darker"
}: FloatDrawerButtonProps) => {
  return (
    <Drawer>
      <DrawerTrigger className="absolute z-20 bottom-18 right-4 bg-main rounded-full p-2 cursor-pointer">
        <Plus className="size-6" />
      </DrawerTrigger>
      <DrawerContent className={`flex flex-col items-center px-4 pb-4 ${contentClassName}`}>
        <ScrollArea className="h-[80vh] w-full">
          <DrawerTitle className="text-center text-white text-xl font-bold mt-2">
            {title}
          </DrawerTitle>
          <div className="container max-w-2xl mx-auto flex flex-col gap-2 items-center p-4 pb-10">
            {formComponent}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

export default FloatDrawerButton;