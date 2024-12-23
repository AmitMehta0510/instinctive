import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from '../features/students/studentSlice';  

const store = configureStore({
  reducer: {
    students: studentsReducer, 
  },
});

export default store;
