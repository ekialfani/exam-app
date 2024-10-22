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
      throw error.response.data;
    }
  }
);

export const updateStudent = createAsyncThunk(
  "student/update",
  async ({ studentId, updatedStudent, token }) => {
    try {
      const response = await axios.put(
        `${CONFIG.apiUrl}:8080/students/${studentId}`,
        updatedStudent,
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

export const changeStudentPassword = createAsyncThunk(
  "lecturer/change-password",
  async ({ studentId, newPassword, token }) => {
    try {
      const response = await axios.patch(
        `${CONFIG.apiUrl}:8080/students/${studentId}`,
        newPassword,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.message;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const initialState = {
  status: "idle",
  student: null,
  message: null,
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
      })
      .addCase(updateStudent.pending, (state) => {
        state.status = "loading";
        state.student = null;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.student = action.payload;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(changeStudentPassword.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = null;
      })
      .addCase(changeStudentPassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload;
      })
      .addCase(changeStudentPassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default studentSlice.reducer;
