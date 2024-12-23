import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../superbase_client"; 

// Async thunk to fetch students from the Supabase database
export const fetchStudents = createAsyncThunk("students/fetchStudents", async () => {
  const { data, error } = await supabase.from("students").select("*");
  if (error) {
    throw new Error(error.message); // Handle Supabase errors
  }
  return data; // Return fetched student data
});

// Define the students slice
const studentsSlice = createSlice({
  name: "students",
  initialState: {
    list: [], // List of students
    filteredList: [], // Filtered list of students
    status: "idle", // Status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Store errors
    selectedYear: "", // Currently selected academic year
    selectedCourse: "", // Currently selected course
  },
  reducers: {
    // Synchronous reducer to update the filtered student list
    setStudents: (state, action) => {
      state.filteredList = action.payload;
    },
    // Reducers for updating filters
    selectYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    selectCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload; // Update the list with fetched data
        state.filteredList = action.payload; // Initialize filtered list with all students
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Store the error message
      });
  },
});

// Export actions and reducer
export const { setStudents, selectYear, selectCourse } = studentsSlice.actions;
export default studentsSlice.reducer;
