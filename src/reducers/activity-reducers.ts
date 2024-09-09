import { Activity } from '../types';

export type ActivityActions = {type: 'save-activity',payload: {newActivity: Activity}} 
|{type: 'set-activeId', payload: {id: Activity['id']}} |  
{type: 'remove-activity', payload: {id: Activity['id']}} |
{type: 'restart-app'}

export type ActivityState = {
    activities: Activity[],
    activeId:  Activity['id'],
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities');
    if(activities){
        return JSON.parse(activities);
    }
    return [];
}
export const initialState : ActivityState = {
    activities: localStorageActivities(),
    activeId: '',
}

export const activityReducer = (state: ActivityState, action: ActivityActions) => {
    if (action.type === 'save-activity') {
        let updatedActivities : Activity[] = []
        if(state.activeId){
            updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        }else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }
        return {
            ...state,
            activities: updatedActivities,     
        }
    }
    if (action.type ==='set-activeId') {
        return {
           ...state,
            activeId: action.payload.id,
            actiId:''
        }
    }

    if (action.type ==='remove-activity') {
        return {
           ...state,
            activities: state.activities.filter(activity => activity.id!== action.payload.id),
            activeId: '',
        }
    }

    if (action.type ==='restart-app') {
        return {
            activities: [],
            activeId: '',
        }
    }

    return state;
}