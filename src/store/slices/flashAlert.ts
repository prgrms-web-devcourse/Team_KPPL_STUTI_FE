import { RootState } from '@src/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface alertState {
  variant?: 'outlined' | 'filled';
  severity?: 'error' | 'warning' | 'info' | 'success';
  title: string;
  content?: string;
  show?: boolean;
}

const initialState: alertState = {
  variant: 'filled',
  severity: 'info',
  title: '',
  content: '',
  show: false,
};

export const flashAlertSlice = createSlice({
  name: 'flashAlert',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    openAlert: (state: alertState, actions: PayloadAction<alertState>) => {
      const { variant, severity, title, content } = actions.payload;

      state.variant = variant;
      state.severity = severity;
      state.title = title;
      state.content = content;
      state.show = true;
    },
    closeAlert: (state: alertState) => {
      state.show = false;
    },
  },
});

export const selectFlashAlert = (state: RootState) => state.flashAlert;

export const { openAlert, closeAlert } = flashAlertSlice.actions;

export default flashAlertSlice.reducer;
