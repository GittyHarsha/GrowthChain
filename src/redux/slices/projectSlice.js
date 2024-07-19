import { createSlice } from '@reduxjs/toolkit'
export const projectSlice = createSlice({
  name: 'project',
  initialState: {
    name: ''
  },
  reducers: {
    setProjectName: (state, action)=> {
        state.name = action.payload.name;
        alert("project name set to " + state.name);
    }
  },
})

export const { setProjectName } = projectSlice.actions

export default projectSlice.reducer