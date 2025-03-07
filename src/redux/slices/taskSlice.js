import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [], // Initial state is an empty array
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload); // Add new task to the state
    },
    deleteTask: (state, action) => {
      return state.filter(task => task.id !== action.payload); // Remove task by ID
    },
  },
});

export const { addTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;