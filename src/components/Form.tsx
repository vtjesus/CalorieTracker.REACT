import { Dispatch, useState, useEffect } from 'react';
import { categories } from '../data/categories';
import { Activity } from '../types';
import { ActivityActions, ActivityState } from '../reducers/activity-reducers';
import {v4 as uuidv4} from 'uuid'

type FormProps = {
    dispatch: Dispatch<ActivityActions>,
    state : ActivityState
}
export default function Form({dispatch, state}: FormProps) {
    const initialState : Activity ={
        id: uuidv4(),
        category: 1,
        name: '',
        calories: 0,
    }
    const [activity, setActivity] = useState<Activity>(initialState);
    useEffect(() => {
        if(state.activeId){
            const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity);
        }
    }, [state.activeId, state.activities]);

    const handleChange = (e :  React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({...activity, [e.target.id]: isNumberField ? +e.target.value : e.target.value});
    }

    const isValidActivity = () => {
        const {name, calories} = activity; 
        return name.trim() !== "" && calories > 0;
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch( { type: 'save-activity', payload: {newActivity: activity} } );
        setActivity({...initialState, id: uuidv4(),});
    }
 
  return (
   <form onSubmit={handleSubmit}
   className="space-y-5 bg-white shadow p-10 rounded-lg"
   >
    <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className='font-bold'>
            Categorie:
        </label>
        <select value={activity.category} name="category" id="category" className="border border-slate-300 p-2 rounded-lg w-full  bg-white" 
        onChange={handleChange}
        >
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                    {category.name}
                </option>
            ))}
        </select>
    </div>
    <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className='font-bold'>
        Activity:
        </label>
        <input value={activity.name} onChange={handleChange} type="text" id='name' className='border border-slate-300 p-2 rounded-lg' placeholder='Food, Orange Juice, Workout, Cardio, etc'/>
    </div>
    <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className='font-bold'>
        Calories:
        </label>
        <input type="number" onChange={handleChange} id='calories'  value={activity.calories}  pattern="[1-9]" className='border border-slate-300 p-2 rounded-lg' placeholder='Calories. ex, 300, 500'/>
    </div>

    <input type="submit" className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer rounded-lg disabled:opacity-40' 
    value={activity.category === 1 ? "Save Food" : "Save Exercise"} disabled={!isValidActivity()}/>
   </form>
  )
}
