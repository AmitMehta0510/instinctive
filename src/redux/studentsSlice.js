import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../superbase_client";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const { data } = await supabase.from("students").select("*");
    return data;
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: { list: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default studentsSlice.reducer;
