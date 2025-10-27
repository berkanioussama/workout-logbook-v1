interface StatsProps {
    plans: any, 
    workouts: any,
}

const Stats = ({plans, workouts}: StatsProps) => {
    
    return ( 
        <div className='flex gap-2 items-center justify-between w-full'>
            <div className='flex flex-col items-center justify-center'>
                <h3 className='text-sm font-bold'>Plans</h3>
                <span className='text-xl'>{plans.length}</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <h3 className='text-sm font-bold'>Workouts</h3>
                <span className='text-xl'>{workouts.length}</span>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <h3 className='text-sm font-bold'>Exercises</h3>
                <span className='text-xl'>not yet</span>
            </div>
        </div>
     );
}
 
export default Stats;