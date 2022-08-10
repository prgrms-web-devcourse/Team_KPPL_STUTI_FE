import { RootState } from '@src/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  childrenCommentType,
  CommentContentsType,
  CommunityPostCommentType,
} from '@interfaces/community';

export interface commentState {
  value: CommunityPostCommentType;
}

const initialState: commentState = {
  value: {
    contents: [],
    hasNext: true,
    totalElements: 0,
  },
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComment: (
      state: commentState,
      action: PayloadAction<CommunityPostCommentType>,
    ) => {
      state.value = action.payload;
    },
    addComment: (
      state: commentState,
      action: PayloadAction<CommunityPostCommentType>,
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
    addNewComment: (
      state: commentState,
      action: PayloadAction<CommentContentsType | childrenCommentType>,
    ) => {
      const { parentId } = action.payload;
      if (parentId) {
        const targetIndex = state.value.contents.findIndex(
          (comment) => comment.postCommentId === parentId,
        );

        if (targetIndex === -1) return;

        state.value.contents[targetIndex].children.unshift(
          action.payload as childrenCommentType,
        );
      } else {
        state.value.contents.unshift(action.payload as CommentContentsType);
      }
    },
    changeComment: (
      state: commentState,
      action: PayloadAction<CommentContentsType | childrenCommentType>,
    ) => {
      const { parentId, postCommentId } = action.payload;

      if (parentId) {
        const targetIndex = state.value.contents.findIndex(
          (comment) => comment.postCommentId === parentId,
        );

        if (targetIndex === -1) return;

        const targetParent = state.value.contents[targetIndex];

        const targetChildrenIndex = targetParent.children.findIndex(
          (comment: any) => comment.postCommentId === postCommentId,
        );

        if (targetChildrenIndex === -1) return;

        state.value.contents[targetIndex].children[targetChildrenIndex] =
          action.payload as childrenCommentType;
      } else {
        const targetIndex = state.value.contents.findIndex(
          (comment) => comment.postCommentId === postCommentId,
        );

        if (targetIndex === -1) return;

        state.value.contents[targetIndex] = {
          ...state.value.contents[targetIndex],
          ...action.payload,
        };
      }
    },
    deleteComment: (
      state: commentState,
      action: PayloadAction<CommentContentsType | childrenCommentType>,
    ) => {
      const { parentId, postCommentId } = action.payload;

      if (parentId) {
        const targetIndex = state.value.contents.findIndex(
          (comment) => comment.postCommentId === parentId,
        );

        if (targetIndex === -1) return;

        const targetParent = state.value.contents[targetIndex];

        const targetChildrenIndex = targetParent.children.findIndex(
          (comment: any) => comment.postCommentId === postCommentId,
        );

        if (targetChildrenIndex === -1) return;

        state.value.contents[targetIndex].children.splice(
          targetChildrenIndex,
          1,
        );
      } else {
        const targetIndex = state.value.contents.findIndex(
          (comment) => comment.postCommentId === postCommentId,
        );

        if (targetIndex === -1) return;

        state.value.contents.splice(targetIndex, 1);
      }
    },
  },
});

export const selectComment = (state: RootState) => state.comment.value;

export const {
  setComment,
  addComment,
  addNewComment,
  changeComment,
  deleteComment,
} = commentSlice.actions;

export default commentSlice.reducer;
