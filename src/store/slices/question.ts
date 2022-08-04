import { RootState } from '@src/store';
import { detailQuestionsType } from '@src/interfaces/studyDetail';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface questionState {
  value: detailQuestionsType[];
}

const initialState: questionState = {
  value: [],
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestions: (
      state: questionState,
      action: PayloadAction<detailQuestionsType[]>,
    ) => {
      state.value = action.payload;
    },
    addQuestions: (
      state: questionState,
      action: PayloadAction<detailQuestionsType[]>,
    ) => {
      state.value = [...state.value, ...action.payload];
    },
    changeQuestion: (
      state: questionState,
      action: PayloadAction<detailQuestionsType>,
    ) => {
      const targetIndex = state.value.findIndex(
        (question) =>
          question.studyGroupQuestionId === action.payload.studyGroupQuestionId,
      );

      if (targetIndex === -1) return;

      state.value[targetIndex] = action.payload;
    },
    deleteQuestion: (
      state: questionState,
      action: PayloadAction<detailQuestionsType>,
    ) => {
      const targetIndex = state.value.findIndex(
        (question) =>
          question.studyGroupQuestionId === action.payload.studyGroupQuestionId,
      );

      if (targetIndex === -1) return;

      state.value.splice(targetIndex, 1);
    },
  },
});

export const selectQuestion = (state: RootState) => state.question.value;

export const { setQuestions, addQuestions, changeQuestion, deleteQuestion } =
  questionSlice.actions;

export default questionSlice.reducer;
