import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CONFIG from "../../config";

export const getAllExamReports = createAsyncThunk(
  "exam-report/get-all",
  async ({ token }) => {
    try {
      const response = await axios.get(`${CONFIG.apiUrl}:8080/exams/reports/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const getExamReportByExamId = createAsyncThunk(
  "exam-report/get-exam-report-by-exam-id",
  async ({ examId, token }) => {
    try {
      const response = await axios.get(
        `${CONFIG.apiUrl}:8080/exams/reports/${examId}`,
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
  examReports: null,
  examReport: null,
  error: null,
};

const examReportSlice = createSlice({
  name: "report",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllExamReports.pending, (state) => {
        state.status = "loading";
        state.examReports = null;
        state.error = null;
      })
      .addCase(getAllExamReports.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.examReports = action.payload;
      })
      .addCase(getAllExamReports.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(getExamReportByExamId.pending, (state) => {
        state.status = "loading";
        state.examReport = null;
        state.error = null;
      })
      .addCase(getExamReportByExamId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.examReport = action.payload;
      })
      .addCase(getExamReportByExamId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default examReportSlice.reducer;
