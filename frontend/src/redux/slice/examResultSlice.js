import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CONFIG from "../../config";

export const createExamResult = createAsyncThunk(
  "exam-result/create",
  async ({ examResult, token }) => {
    console.log("data: ", examResult);
    try {
      const response = await axios.post(
        `${CONFIG.apiUrl}:8080/exam-results/`,
        examResult,
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
  userAnswersTemp: [],
  calculationStatus: "idle",
  calculationResult: null,
  examResult: null,
  error: null,
};

const examResultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    createUserAnswerTemp: (state, action) => {
      const { answerData } = action.payload;

      const isAnswerExist = state.userAnswersTemp?.find(
        (answer) => answer.id === answerData.id
      );

      if (isAnswerExist) {
        state.userAnswersTemp[answerData.index] = answerData;
        return;
      }

      state.userAnswersTemp.push(answerData);
    },

    resetUserAnswerTemp: (state) => {
      state.userAnswersTemp = [];
      state.calculationResult = null;
      state.calculationStatus = "idle";
    },
    calculateExamResult: (state) => {
      let grade = 0;
      let totalCorrect = 0;

      state?.userAnswersTemp?.forEach((question) => {
        if (question.user_answer === question.correct_answer) {
          grade += question.point;
          totalCorrect++;
        }
      });

      state.calculationResult = {
        grade: grade,
        total_correct: totalCorrect,
        total_incorrect: state?.userAnswersTemp?.length - totalCorrect,
      };

      state.calculationStatus = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExamResult.pending, (state) => {
        state.status = "loading";
        state.examResult = null;
        state.error = null;
      })
      .addCase(createExamResult.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.examResult = action.payload;
      })
      .addCase(createExamResult.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.error);
        state.error = action.error;
      });
  },
});

export const {
  createUserAnswerTemp,
  resetUserAnswerTemp,
  calculateExamResult,
} = examResultSlice.actions;
export default examResultSlice.reducer;
