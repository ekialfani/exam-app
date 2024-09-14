import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CONFIG from "../../config";

export const getStudentById = createAsyncThunk(
  "student/get-student-by-id",
  async ({ studentId, token }) => {
    try {
      const response = await axios.get(
        `${CONFIG.apiUrl}:8080/students/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const initialState = {
  status: "idle",
  student: null,
  error: null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getStudentById.pending, (state) => {
        state.status = "loading";
        state.student = null;
        state.error = null;
      })
      .addCase(getStudentById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.student = action.payload;
      })
      .addCase(getStudentById.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.error;
      });
  },
});

export default studentSlice.reducer;
