import type { Activity } from '../types';
import { useMemo } from 'react';
import CalorieDisplay from './CalorieDisplay';
type CalorieTrackerProps = {
  activities: Activity[]
}
export default function CalorieTracker({activities} : CalorieTrackerProps) {
  const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.calories == 1 ? total + activity.calories : total, 0), [activities])
  const caloriesLosses = useMemo(() => activities.reduce((total, activity) => activity.calories == 2 ? total + activity.calories : total, 0), [activities])
  const netCalories = useMemo(() => caloriesConsumed - caloriesLosses, [caloriesConsumed, caloriesLosses])
  return (
    <>
    <h2 className="text-4xl font-bold text-white text-center">
      Calories Balance
    </h2>
    <div className='flex flex-col items-center  md:flex-row md:justify-between gap-5 mt-10'>
      <CalorieDisplay
      calories={caloriesConsumed}
      text="Consumed"
      color="text-orange-200"
      />
      <CalorieDisplay
      calories={netCalories}
      text="Net"
      color="text-blue-200"
      />
      <CalorieDisplay
      calories={caloriesLosses}
      text="Burned"
      color="text-green-200"
      />
    </div>
   
    </>
  )
}
