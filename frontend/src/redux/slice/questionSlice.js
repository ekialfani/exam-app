import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CONFIG from "../../config";

export const createQuestion = createAsyncThunk(
  "question/create",
  async ({ questionData, token }) => {
    try {
      const response = await axios.post(
        `${CONFIG.apiUrl}:8080/questions`,
        questionData,
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

export const updateQuestion = createAsyncThunk(
  "question/update",
  async ({ questionId, updatedQuestion, token }) => {
    try {
      const response = await axios.put(
        `${CONFIG.apiUrl}:8080/questions/${questionId}`,
        updatedQuestion,
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

export const getQuestionsByExamId = createAsyncThunk(
  "questions/get-all-questions-by-exam-id",
  async ({ examId, token }) => {
    try {
      const response = await axios.get(
        `${CONFIG.apiUrl}:8080/questions/${examId}`,
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

export const deleteQuestion = createAsyncThunk(
  "question/delete",
  async ({ questionId, token }) => {
    try {
      const response = await axios.delete(
        `${CONFIG.apiUrl}:8080/questions/${questionId}`,
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
  message: null,
  questionsTemp: [],
  question: null,
  questions: null,
  createdQuestion: null,
  error: null,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    createQuestionTemp: (state, action) => {
      const newQuestion = action.payload;

      const isQuestionTempExist = state.questionsTemp.find(
        (question) => question.id == newQuestion.id
      );

      if (isQuestionTempExist) return;

      state.questionsTemp.push(newQuestion);
    },
    editQuestionTemp: (state, action) => {
      const updatedQuestion = action.payload;

      state.questionsTemp = state.questionsTemp.map((question, index) => {
        if (question.id == updatedQuestion.id) {
          return (question[index] = updatedQuestion);
        }

        return question;
      });
    },
    resetQuestionTemp: (state) => {
      state.questionsTemp = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createQuestion.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.createdQuestion = null;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.createdQuestion = action.payload;
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(updateQuestion.pending, (state) => {
        state.status = "loading";
        state.question = null;
        state.error = null;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.question = action.payload;
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(getQuestionsByExamId.pending, (state) => {
        state.status = "loading";
        state.questions = null;
        state.error = null;
      })
      .addCase(getQuestionsByExamId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.questions = action.payload;
      })
      .addCase(getQuestionsByExamId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload;
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { createQuestionTemp, editQuestionTemp, resetQuestionTemp } =
  questionSlice.actions;
export default questionSlice.reducer;
