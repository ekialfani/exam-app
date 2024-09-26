import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CONFIG from "./../../config";

export const getLecturerById = createAsyncThunk(
  "lecturer/get-lecturer-by-id",
  async ({ lecturerId, token }) => {
    try {
      const response = await axios.get(
        `${CONFIG.apiUrl}:8080/lecturers/${lecturerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const initialState = {
  status: "idle",
  lecturer: null,
  error: null,
};

const lecturerSlice = createSlice({
  name: "lecturer",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getLecturerById.pending, (state) => {
        state.status = "loading";
        state.lecturer = null;
        state.error = null;
      })
      .addCase(getLecturerById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lecturer = action.payload;
      })
      .addCase(getLecturerById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default lecturerSlice.reducer;
