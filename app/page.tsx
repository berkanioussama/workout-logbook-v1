import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center w-full h-svh">
      <SignOutButton><Button size={"sm"}>Logout</Button></SignOutButton>  
    </div>
  );
}
