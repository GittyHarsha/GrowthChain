import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs';
export const goalsSlice = createSlice({
  name: 'goals',
  initialState: {
    dailyGoals: [],
    monthlyGoals: [],
    endGoals: [],
    lastDate: dayjs().format('DD-MM-YYYY')
  },
  reducers: {
    addGoal: (state, action)=> {
        switch(action.payload.goalType) {
            case 'dailyGoal': {
                state.dailyGoals.push(action.payload.goal);
                break;
            }
            case 'monthlyGoal': {
                state.monthlyGoals.push(action.payload.goal);
                break;
            }
            case 'endGoal': {
                state.endGoals.push(action.payload.goal);
                break;
            }
            default: {
                state.endGoals.push(action.payload.goal);
                break;
            }
        }
    },
    deleteGoal: (state, action)=> {
        let index = action.payload.index;
        switch(action.payload.goalType) {
            case 'dailyGoal': {
                state.dailyGoals.splice(index, 1);
                break;
            }
            case 'monthlyGoal': {
                state.monthlyGoals.splice(index, 1);
                break;
            }
            case 'endGoal': {
                state.endGoals.splice(index, 1);
                break;
            }
            default: {
                state.endGoals.splice(index, 1);
                break;
            }
        }
    },
    setGoals: (state, action)=> {
        let goals = action.payload.goals;
        switch(action.payload.goalType) {
            case 'dailyGoals': {
                state.dailyGoals = goals;
                break;
            }
            case 'monthlyGoals': {
                state.monthlyGoals = goals;
                break;
            }
            case 'endGoals': {
                state.endGoals = goals;
                break;
            }
            default: {
                state.endGoals = goals;
                break;
            }
        }
    },
    setLastDate(state, action) {
        state.lastDate = action.payload.date;
    }
  },
})

export const { addGoal, deleteGoal, setGoals,setLastDate } = goalsSlice.actions

export default goalsSlice.reducer