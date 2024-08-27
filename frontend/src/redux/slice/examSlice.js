import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CONFIG from "../../config";

export const createExam = createAsyncThunk(
  "exam/create",
  async ({ examData, token }) => {
    try {
      const response = await axios.post(
        `${CONFIG.apiUrl}:8080/exams`,
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

const initialState = {
  status: "idle",
  examCreated: null,
  error: null,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createExam.pending, (state) => {
        state.status = "loading";
        state.examCreated = null;
        state.error = null;
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.examCreated = action.payload;
      })
      .addCase(createExam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default examSlice.reducer;
