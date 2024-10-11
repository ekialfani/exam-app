import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CONFIG from "../../config";

export const createCompletedExam = createAsyncThunk(
  "completed-exam/create",
  async ({ examData, token }) => {
    try {
      const response = await axios.post(
        `${CONFIG.apiUrl}:8080/completed-exams/`,
        examData,
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

export const getAllCompletedExams = createAsyncThunk(
  "completed-exam/get-all",
  async ({ token }) => {
    try {
      const response = await axios.get(
        `${CONFIG.apiUrl}:8080/completed-exams/`,
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
  completedExam: null,
  completedExams: null,
  error: null,
};

const completedExamSlice = createSlice({
  name: "completed",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createCompletedExam.pending, (state) => {
        state.status = "loading";
        state.completedExam = null;
        state.error = null;
      })
      .addCase(createCompletedExam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.completedExam = action.payload;
      })
      .addCase(createCompletedExam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(getAllCompletedExams.pending, (state) => {
        state.status = "loading";
        state.completedExams = null;
        state.error = null;
      })
      .addCase(getAllCompletedExams.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.completedExams = action.payload;
      })
      .addCase(getAllCompletedExams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default completedExamSlice.reducer;
