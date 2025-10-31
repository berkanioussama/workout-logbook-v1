'use client'

import { useGetProfile } from '@/features/users/hooks/use-get-profile'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { SignOutButton } from '@clerk/nextjs'
import TopBar from './components/top-bar'
import Stats from './components/stats'
import LoadingPage from '@/components/loading-page'

const Profile = () => {

    const { data: profile, isLoading: profileLoading, error: profileError } = useGetProfile()
    if(profileLoading) return <LoadingPage/>
    if(profileError) return <Alert variant="destructive">
        <AlertDescription>Error loading user info</AlertDescription>
    </Alert>
  
    return ( 
        <div className="flex flex-col items-center w-full min-h-svh">
            <TopBar />
            <div className="container max-w-xl mx-auto p-4">
                <UpdateUserForm user={profile.user}/>
                <Stats 
                    plans={profile.plans} 
                    workouts={profile.workouts}
                    exercises={profile.exercises}
                />
            </div>
        </div> 
    );
}
 
export default Profile;

const UpdateUserForm = ({ user }: { user: any }) => {
    return (
        <div className="container max-w-xl mx-auto p-4 flex flex-col items-center justify-center">
            <div className='flex gap-4 items-center justify-between w-full'>
                <Image
                    src={user.image}
                    alt="User Image"
                    width={100}
                    height={100}
                    className="rounded-full bg-neutral-800"
                />
                <div className='flex gap-4 justify-between w-fit'>
                    <h1 className="text-lg font-bold">{user.name} </h1>
                    <SignOutButton><Button size={"sm"}>Logout</Button></SignOutButton>
                </div>
            </div>
        </div> 
    )
}
