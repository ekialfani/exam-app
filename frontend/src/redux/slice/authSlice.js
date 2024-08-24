import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk("auth/register", async (userData) => {
  try {
    if (userData.role == "Mahasiswa") {
      const response = await axios.post(
        "http://172.16.20.113:8080/students/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } else {
      const response = await axios.post(
        "http://172.16.20.113:8080/lecturers/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    }
  } catch(error) {
    throw(error.response.data)
  }
});

const initialState = {
  status: "idle",
  user: null,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading"
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error
      });
  },
});

export default authSlice.reducer;
