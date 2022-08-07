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
    addNewQuestion: (
      state: questionState,
      action: PayloadAction<questionContentType | childrenQuestionType>,
    ) => {
      const { parentId } = action.payload;

      if (parentId) {
        const targetIndex = state.value.contents.findIndex(
          (question) => question.studyGroupQuestionId === parentId,
        );

        if (targetIndex === -1) return;

        state.value.contents[targetIndex].children.unshift(
          action.payload as childrenQuestionType,
        );
      } else {
        state.value.contents.unshift(action.payload as questionContentType);
      }
    },
    changeQuestion: (
      state: questionState,
      action: PayloadAction<questionContentType | childrenQuestionType>,
    ) => {
      const { parentId, studyGroupQuestionId } = action.payload;

      if (parentId) {
        const targetIndex = state.value.contents.findIndex(
          (question) => question.studyGroupQuestionId === parentId,
        );

        if (targetIndex === -1) return;

        const targetParent = state.value.contents[targetIndex];

        const targetChildrenIndex = targetParent.children.findIndex(
          (question) => question.studyGroupQuestionId === studyGroupQuestionId,
        );

        if (targetChildrenIndex === -1) return;

        state.value.contents[targetIndex].children[targetChildrenIndex] =
          action.payload as childrenQuestionType;
      } else {
        const targetIndex = state.value.contents.findIndex(
          (question) => question.studyGroupQuestionId === studyGroupQuestionId,
        );

        if (targetIndex === -1) return;

        state.value.contents[targetIndex] = {
          ...state.value.contents[targetIndex],
          ...action.payload,
        };
      }
    },
    deleteQuestion: (
      state: questionState,
      action: PayloadAction<questionContentType | childrenQuestionType>,
    ) => {
      const { parentId, studyGroupQuestionId } = action.payload;

      if (parentId) {
        const targetIndex = state.value.contents.findIndex(
          (question) => question.studyGroupQuestionId === parentId,
        );

        if (targetIndex === -1) return;

        const targetParent = state.value.contents[targetIndex];

        const targetChildrenIndex = targetParent.children.findIndex(
          (question) => question.studyGroupQuestionId === studyGroupQuestionId,
        );

        if (targetChildrenIndex === -1) return;

        state.value.contents[targetIndex].children.splice(
          targetChildrenIndex,
          1,
        );
      } else {
        const targetIndex = state.value.contents.findIndex(
          (question) => question.studyGroupQuestionId === studyGroupQuestionId,
        );

        if (targetIndex === -1) return;

        state.value.contents.splice(targetIndex, 1);
      }
    },
  },
});

export const selectQuestion = (state: RootState) => state.question.value;

export const {
  setQuestions,
  addQuestions,
  addNewQuestion,
  changeQuestion,
  deleteQuestion,
} = questionSlice.actions;

export default questionSlice.reducer;
