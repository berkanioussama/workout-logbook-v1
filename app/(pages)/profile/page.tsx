'use client'

import { useGetUser } from '@/features/users/hooks/use-get-user'
import Image from 'next/image'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { SignOutButton } from '@clerk/nextjs'
import { useGetUserPlans } from '@/features/plans/hooks/use-get-user-plans'
import { useGetUserWorkouts } from '@/features/workouts/hooks/use-get-user-workouts'
import TopBar from './components/top-bar'
import Stats from './components/stats'

const Profile = () => {

    const { data: user, isLoading: userLoading, error: userError } = useGetUser()
    const { data: plans, isLoading: plansLoading, error: plansError } = useGetUserPlans()
    const { data: workouts, isLoading: workoutsLoading, error: workoutsError } = useGetUserWorkouts()
  
    return ( 
        <div className="flex flex-col items-center w-full min-h-svh ">
            <TopBar />
            <div className="container p-4">
                {userError ? (
                    <Alert variant="destructive">
                        <AlertDescription>Error loading user info</AlertDescription>
                    </Alert>
                ) : null}
                {userLoading ? <Spinner className='mx-auto' /> : <UpdateUserForm user={user} />}
            
                {plansError || workoutsError ? (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>
                            {plansError && 'Failed to load plans. '}
                            {workoutsError && 'Failed to load workouts.'}
                        </AlertDescription>
                    </Alert>
                ) : null}
                <Stats 
                    plans={plans} 
                    workouts={workouts} 
                    plansLoading={plansLoading}
                    workoutsLoading= {workoutsLoading}
                />
            </div>
        </div> 
    );
}
 
export default Profile;

const UpdateUserForm = ({ user }: { user: any }) => {
    return (
        <div className="container p-4 flex flex-col items-center justify-center">
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
