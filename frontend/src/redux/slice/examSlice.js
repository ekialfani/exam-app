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

export const getAllExams = createAsyncThunk(
  "exam/get-all-exams",
  async ({ token }) => {
    try {
      const response = await axios.get(`${CONFIG.apiUrl}:8080/exams/`, {
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

export const getExamById = createAsyncThunk(
  "exam/get-exam-by-id",
  async ({ examId, token }) => {
    try {
      const response = await axios.get(
        `${CONFIG.apiUrl}:8080/exams/${examId}`,
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

export const getExamByToken = createAsyncThunk(
  "exam/get-exam-by-token",
  async ({ examToken, token }) => {
    try {
      const response = await axios.get(
        `${CONFIG.apiUrl}:8080/exams/token/${examToken}`,
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

export const GetExamWithShuffledQuestions = createAsyncThunk(
  "exam/get-exam-with-shuffled-questions",
  async ({ examId, token }) => {
    try {
      const response = await axios.get(
        `${CONFIG.apiUrl}:8080/exams/shuffled-questions/${examId}`,
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

export const updateExam = createAsyncThunk(
  "exam/update-exam",
  async ({ examId, updatedExam, token }) => {
    try {
      const response = await axios.put(
        `${CONFIG.apiUrl}:8080/exams/${examId}`,
        updatedExam,
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

export const createExamAssignment = createAsyncThunk(
  "exam-assignment/create",
  async ({ examId, token }) => {
    try {
      const response = await axios.post(
        `${CONFIG.apiUrl}:8080/exam-assignments/`,
        { exam_id: examId },
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

export const getAllExamAssignments = createAsyncThunk(
  "exam-assignment/get-all-exam-assignments",
  async ({ token }) => {
    try {
      const response = await axios.get(
        `${CONFIG.apiUrl}:8080/exam-assignments/`,
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

export const deleteExamAssignment = createAsyncThunk(
  "exam-assignment/delete",
  async ({ examId, token }) => {
    try {
      const response = await axios.delete(
        `${CONFIG.apiUrl}:8080/exam-assignments/${examId}`,
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
  exam: null,
  exams: null,
  examAssignment: null,
  examAssignments: null,
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
      })
      .addCase(getAllExams.pending, (state) => {
        state.status = "loading";
        state.exams = null;
        state.error = null;
      })
      .addCase(getAllExams.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exams = action.payload;
      })
      .addCase(getAllExams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(getExamById.pending, (state) => {
        state.status = "loading";
        state.exam = null;
        state.error = null;
      })
      .addCase(getExamById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exam = action.payload;
      })
      .addCase(getExamById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(getExamByToken.pending, (state) => {
        state.status = "loading";
        state.exam = null;
        state.error = null;
      })
      .addCase(getExamByToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exam = action.payload;
      })
      .addCase(getExamByToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(GetExamWithShuffledQuestions.pending, (state) => {
        state.status = "loading";
        state.exam = null;
        state.error = null;
      })
      .addCase(GetExamWithShuffledQuestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exam = action.payload;
      })
      .addCase(GetExamWithShuffledQuestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(updateExam.pending, (state) => {
        state.status = "loading";
        state.exam = null;
        state.error = null;
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exam = action.payload;
      })
      .addCase(updateExam.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(createExamAssignment.pending, (state) => {
        state.status = "loading";
        state.examAssignment = null;
        state.error = null;
      })
      .addCase(createExamAssignment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.examAssignment = action.payload;
      })
      .addCase(createExamAssignment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(getAllExamAssignments.pending, (state) => {
        state.status = "loading";
        state.examAssignments = null;
        state.error = null;
      })
      .addCase(getAllExamAssignments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.examAssignments = action.payload;
      })
      .addCase(getAllExamAssignments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(deleteExamAssignment.pending, (state) => {
        state.status = "loading";
        state.examAssignment = null;
        state.error = null;
      })
      .addCase(deleteExamAssignment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.examAssignment = action.payload;
      })
      .addCase(deleteExamAssignment.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.error);
        state.error = action.error;
      });
  },
});

export default examSlice.reducer;
