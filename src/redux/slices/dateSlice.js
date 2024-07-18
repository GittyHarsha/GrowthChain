import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs';

let month = dayjs().month();
let year = dayjs().year();
export const dateSlice = createSlice({
  name: 'date',
  initialState: {
    month: month,
    year: year,
  },
  reducers: {
    setDate(state, action) {
      state.month = action.payload.month;
      state.year = action.payload.year;
    }
  },
})

export const { setDate } = dateSlice.actions

export default dateSlice.reducer