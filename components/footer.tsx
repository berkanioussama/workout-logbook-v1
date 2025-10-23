import { Dumbbell, House, UserRound } from "lucide-react";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-neutral-800 text-white absolute bottom-0 w-full flex items-center justify-center">
            <div className="container grid grid-cols-3">
                <div className="flex items-center justify-center text-white/80  py-2">
                    <Link href="/" className="flex flex-col items-center hover:text-blue-600 duration-300">
                        <House />
                        <span className="text-xs">Home</span>
                    </Link>
                </div>
                <div className="flex items-center justify-center text-white/80 py-2">
                    <Link href="/workout" className="flex flex-col items-center hover:text-blue-600">
                        <Dumbbell />
                        <span className="text-xs">Workout</span>
                    </Link>
                </div>
                <div className="flex items-center justify-center text-white/80 py-2">
                    <Link href="/profile" className="flex flex-col items-center hover:text-blue-600">
                        <UserRound />
                        <span className="text-xs">Profile</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;