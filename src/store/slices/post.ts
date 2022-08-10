import { RootState } from '@src/store';
import { CommunityType, CommunityPostType } from '@src/interfaces/community';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface postState {
  value: CommunityType;
}

const initialState: postState = {
  value: {
    posts: [],
    hasNext: true,
  },
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state: postState, action: PayloadAction<CommunityType>) => {
      state.value = action.payload;
    },
    addPost: (state: postState, action: PayloadAction<CommunityType>) => {
      if (!action.payload.posts || !state.value.posts) return;

      state.value.posts = [...state.value.posts, ...action.payload.posts];
      state.value.hasNext = action.payload.hasNext;
    },
    createPost: (
      state: postState,
      action: PayloadAction<CommunityPostType>,
    ) => {
      if (!action.payload || !state.value.posts) return;

      if (state.value.posts) {
        state.value.posts = [action.payload, ...state.value.posts];
      } else state.value.posts = [action.payload];
    },
    editPost: (state: postState, action: PayloadAction<CommunityPostType>) => {
      if (!action.payload || !state.value.posts) return;

      const editPostIndex = state.value.posts.findIndex(
        ({ postId }) => postId === action.payload.postId,
      );

      state.value.posts[editPostIndex] = action.payload;
    },
    deletePost: (state: postState, action: PayloadAction<number>) => {
      if (!action.payload || !state.value.posts) return;

      state.value.posts = state.value.posts
        .slice()
        .filter(({ postId }) => postId !== action.payload);
    },
  },
});

export const selectPost = (state: RootState) => state.post;

export const { setPost, addPost, createPost, editPost, deletePost } =
  postSlice.actions;
export default postSlice.reducer;
