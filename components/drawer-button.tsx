'use client'

import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";

interface DrawerButtonProps {
    children: ReactNode;
    title: string;
    formComponent: ReactNode;
    contentClassName?: string;
}

const DrawerButton = ({ 
  children, 
  title, 
  formComponent,
  contentClassName = "bg-neutral-900"
}: DrawerButtonProps) => {
  return (
    <Drawer>
      <DrawerTrigger>
        {children}
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

export default DrawerButton;