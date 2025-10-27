'use client'

import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";

interface DrawerButtonProps {
  children: ReactNode;
  title: string;
  formComponent: ReactNode;
  triggerClassName?: string;
  contentClassName?: string;
}

const DrawerButton = ({ 
  children, 
  title, 
  formComponent, 
  triggerClassName = "flex items-center justify-center gap-2 bg-neutral-800 px-2 py-2 rounded-md font-semibold cursor-pointer",
  contentClassName = "bg-neutral-900"
}: DrawerButtonProps) => {
  return (
    <Drawer>
      <DrawerTrigger className={triggerClassName}>
        {children}
      </DrawerTrigger>
      <DrawerContent className={`flex flex-col items-center ${contentClassName}`}>
        <ScrollArea className="h-[80vh] w-full">
          <DrawerTitle className="text-center text-white text-xl font-bold mt-2">
            {title}
          </DrawerTitle>
          {formComponent}
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerButton;