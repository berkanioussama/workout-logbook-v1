'use client'

import { useGetUser } from '@/features/users/hooks/use-get-user'
import { Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import { SignOutButton } from '@clerk/nextjs'

const Profile = () => {

    const { data: user, isLoading, error } = useGetUser()

    if (isLoading) return <div className="flex gap-2 items-center justify-center w-full h-svh"><Spinner /><p>Loading...</p></div>
    if (error) return <div className="flex items-center justify-center w-full h-svh"><p>Error loading user info</p></div>
  
    return ( 
        <div className="flex flex-col items-center w-full min-h-svh ">
            <TopBar />
            <UpdateUserForm user={user} />
        </div> 
    );
}
 
export default Profile;

const TopBar = () => {
    return (
        <div className="flex items-center justify-center w-full bg-neutral-800 py-4">
            <div className="container px-4 flex items-center justify-between">
                <div>
                    <h3>Profile</h3>
                </div>
                <div>
                    <Link href="/profile/edit" className='cursor-pointer'><Settings /></Link>
                </div>
            </div>
        </div> 
    )
}

const UpdateUserForm = ({ user }: { user: any }) => {
    return (
        <div className="container p-4 flex flex-col items-center justify-center">
            <div className='flex gap-4 items-center justify-center'>
                <Image
                    src={user.image}
                    alt="User Image"
                    width={100}
                    height={100}
                    className="rounded-full bg-neutral-800"
                />
                <div className='flex flex-col gap-4 justify-between w-fit'>
                    <h1 className="text-lg font-bold">{user.name} <SignOutButton><Button size={"sm"}>Logout</Button></SignOutButton></h1>
                    <div className='flex gap-2 items-center justify-between w-full'>
                        <div className='flex flex-col items-center justify-center'>
                            <h3 className='text-sm font-bold'>Workouts</h3>
                            <span className='text-xl'>0</span>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <h3 className='text-sm font-bold'>Workouts</h3>
                            <span className='text-xl'>0</span>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <h3 className='text-sm font-bold'>Workouts</h3>
                            <span className='text-xl'>0</span>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}
