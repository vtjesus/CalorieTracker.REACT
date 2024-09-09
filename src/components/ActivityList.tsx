import type { Activity } from '../types';
import { categories } from '../data/categories';
import { useMemo, Dispatch } from 'react';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ActivityActions } from '../reducers/activity-reducers';
type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch} : ActivityListProps) {

    const categoryName = useMemo(() => 
        (category: Activity['category']) => categories.map(cat => cat.id == category ? cat.name : ""), [])
    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])
  return (
    <>
    <h2 className="text-4xl font-bold text-slate-600 text-center">
    Food & Activities
    </h2>
    {
        isEmptyActivities ? <p className='text-center'>There are no activities yet...</p> :	
        activities.map( activity => (
            <div key={activity.id} className='px-5 py-10 bg-white mt-5 flex justify-between shadow-md'>
                <div className='space-y-2 relative'>
                    <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? "bg-sky-500" : "bg-teal-500"}`}>
                        {categoryName(+activity.category)}
                    </p>
                    <p className='text-2xl font-bold pt-5'>
                        {activity.name}
                    </p>
                    <p className='font-black text-4xl text-sky-500'>
                        {activity.calories}{' '}
                        <span>Calories</span></p>
                </div>
                <div className='flex gap-5 items-center'>
                    <button onClick={() => dispatch({type:"set-activeId", payload: {id: activity.id}})}>
                        <PencilSquareIcon  className='h-6 w-6 text-slate-500'/>
                    </button>
                    <button onClick={() => dispatch({type:"remove-activity", payload: {id: activity.id}})}>
                        <XCircleIcon  className='h-6 w-6 text-red-400'/>
                    </button>
                </div>
            </div>
        ))
    }
    </>
  )
}
