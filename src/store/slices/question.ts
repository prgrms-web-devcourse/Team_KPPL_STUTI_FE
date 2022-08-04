import { RootState } from '@src/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  childrenQuestionType,
  questionContentType,
  studyDetailQuestionType,
} from '@interfaces/studyDetailQuestion';

export interface questionState {
  value: studyDetailQuestionType;
}

const initialState: questionState = {
  value: {
    contents: [],
    hasNext: true,
    totalElements: 0,
  },
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestions: (
      state: questionState,
      action: PayloadAction<studyDetailQuestionType>,
    ) => {
      state.value = action.payload;
    },
    addQuestions: (
      state: questionState,
      action: PayloadAction<studyDetailQuestionType>,
    ) => {
      const {
        contents = [],
        hasNext = true,
        totalElements = 0,
      } = action.payload;
      state.value.contents = [...state.value.contents, ...contents];
      state.value.hasNext = hasNext;
      state.value.totalElements = totalElements;
    },
    changeQuestion: (
      state: questionState,
      action: PayloadAction<questionContentType | childrenQuestionType>,
    ) => {
      const { parentId, studyGroupQuestionId } = action.payload;

      const targetIndex = state.value.contents.findIndex(
        (question) => question.studyGroupQuestionId === studyGroupQuestionId,
      );

      if (targetIndex === -1) return;

      if (parentId) {
        state.value.contents[targetIndex] =
          action.payload as questionContentType;
      } else {
        const targetParent = state.value.contents[targetIndex];

        const targetChildrenIndex = targetParent.children.findIndex(
          (question) => question.studyGroupQuestionId === studyGroupQuestionId,
        );

        state.value.contents[targetIndex].children[targetChildrenIndex] =
          action.payload as childrenQuestionType;
      }
    },
    deleteQuestion: (
      state: questionState,
      action: PayloadAction<questionContentType>,
    ) => {
      const targetIndex = state.value.contents.findIndex(
        (question) =>
          question.studyGroupQuestionId === action.payload.studyGroupQuestionId,
      );

      if (targetIndex === -1) return;

      state.value.contents.splice(targetIndex, 1);
    },
  },
});

export const selectQuestion = (state: RootState) => state.question.value;

export const { setQuestions, addQuestions, changeQuestion, deleteQuestion } =
  questionSlice.actions;

export default questionSlice.reducer;
