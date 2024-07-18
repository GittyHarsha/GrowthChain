import { createSlice } from '@reduxjs/toolkit'
export const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    progress: []
  },
  reducers: {
    addProgress: (state, action)=> {
        state.progress.push(action.payload.progress);
    },
    deleteProgress: (state, action)=> {
        let idx = action.payload.index;
        state.progress.slice(idx, 1);
    },
    setProgress: (state, action)=> {
        state.progress = action.payload.progress;
    },
  },
})

export const { addProgress, deleteProgress, setProgress } = progressSlice.actions

export default progressSlice.reducer