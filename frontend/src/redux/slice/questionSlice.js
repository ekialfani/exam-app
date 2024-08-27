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

const initialState = {
  status: "idle",
  questionsTemp: [],
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

      if (!newQuestion.exam_id && !isQuestionTempExist) {
        state.questionsTemp.push(newQuestion);
        return;
      }
    },
    editQuestionTemp: (state, action) => {
      const updatedQuestion = action.payload;

      if (!updatedQuestion.exam_id) {
        state.questionsTemp = state.questionsTemp.map((question, index) => {
          if (question.id == updatedQuestion.id) {
            return (question[index] = updatedQuestion);
          }

          return question;
        });

        return;
      }
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
        console.log("data: ", action.payload)
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
        console.log("error: ", state.error)
      });
  },
});

export const { createQuestionTemp, editQuestionTemp, resetQuestionTemp } =
  questionSlice.actions;
export default questionSlice.reducer;
