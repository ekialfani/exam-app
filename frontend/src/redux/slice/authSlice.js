import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk("auth/register", async (userData) => {
  try {
    if (userData.role == "Mahasiswa") {
      const response = await axios.post(
        "http://192.168.197.98:8080/students/register",
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
        "http://192.168.197.98:8080/lecturers/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    }
  } catch (error) {
    throw error.response.data;
  }
});

export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const response = await axios.post(
      "http://192.168.197.98:8080/users/login",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
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
  reducers: {
    logout: (state) => {
      state.status = "idle";
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.token = null;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
