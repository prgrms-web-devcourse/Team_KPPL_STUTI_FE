import { RootState } from '@src/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logoutUser: (state) => {
      state.user = {};
      state.isLogin = false;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { loginUser, logoutUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
