import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {

  const { userId } = await auth();
    if (userId) {
    redirect('/pages/logs');
  }

  return (
    <div 
      className="w-full h-svh bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBTYt-j3onKl-bHC0pKLYS2yLBJ8MOsjdUhIBwvEwIKbkfx4YFtbB_-vcK7378COZ3rXD7_1HS-oZZXq45UnVazP2kyxhUXWVBdILY-B5I51kPmKg3n2dhPUZUODrhg1wlewiqjxGB2iuyXqJflx4WG5iwPNMSBFgzjoTODolWsE6gyCXkZHkgWzBXMTrdBdFzsh4YxZyKs6sF0UCDl-emLgOh4_ki0BZ7lOilRUCwU-dbHNFi1QGvOBWpBrszIDdRRyTvXZx9AoA")' }}
    >
      <div className="flex flex-col items-center justify-between w-full h-svh bg-background-dark/80 backdrop-blur-sm">
        <TopMessage />
        <Info />
        <GetStarted />
      </div>
    </div>
  );
}

export function TopMessage() {
    return (
        <div className="container flex flex-col items-center justify-center p-4 ">
            <div className="flex gap-4">
              <h1 className="text-xl font-bold mt-1">Workout Logbook</h1>
            </div>  
            <p className="text-sm">Build your Legacy. Track every rep.</p>
        </div>
    );
}

export function Info() {
    return (
        <div className="container flex flex-col items-center justify-center p-4 ">
            Some content here
        </div>
    );
}

export function GetStarted() {
    return (
        <div className="container flex gap-3 flex-col items-center justify-center p-4">
            <Button size="fit" className="font-bold bg-[#42cf17] text-neutral-950">Get Started</Button>
            <Link href="/sign-in" className="w-full"><Button size="fit" variant="secondary" className="font-bold">Log In</Button></Link>
        </div>
    );
}
    


