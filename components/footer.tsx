'use client'

import { Dumbbell, House, Calendar1, CalendarDays, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {

    return (
        <footer className="bg-main-darker text-white absolute bottom-0 w-full flex items-center justify-center pt-3 border-t border-white/10">
            <div className="container grid grid-cols-5">
                <Tab icon={<House size={20} />} href="/pages/logs" name="Home" />
                <Tab icon={<Dumbbell size={20} />} href="/pages/exercises" name="Exercises" />
                <Tab icon={<Calendar1 size={20} />} href="/pages/workouts" name="Workouts" />
                <Tab icon={<CalendarDays size={20} />} href="/pages/plans" name="Plans" />
                <Tab icon={<UserRound size={20} />} href="/pages/profile" name="Profile" />
            </div>
        </footer>
    );
}
 
export default Footer;

const Tab = ({icon, href, name}: {icon: React.ReactNode, href: string, name: string}) => {
    const pathName = usePathname()

        const isActive = (path: string) => {
        return pathName?.startsWith(path);
    };

    const activeLinkClass = "text-main";
    const inactiveLinkClass = "text-white/80 hover:text-main duration-300";
    
    return (
        <Link href={href} className={`flex flex-col gap-1 items-center ${isActive(href) ? activeLinkClass : inactiveLinkClass}`}>
            {icon}
            <span className="text-xs">{name}</span>
        </Link>
    )
}