import { RootState } from '@store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '@interfaces/user';

interface UserState {
  user: UserType | null;
  isLogin: boolean;
}

const initialState: UserState = {
  user: null,
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state: UserState, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logoutUser: (state: UserState) => {
      state.user = null;
      state.isLogin = false;
    },
    updateUser: (state: UserState, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { loginUser, logoutUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
