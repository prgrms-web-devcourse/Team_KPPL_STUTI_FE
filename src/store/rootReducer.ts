import { combineReducers } from '@reduxjs/toolkit';

import user from './slices/user';
import question from './slices/question';
import post from './slices/post';
import flashAlert from './slices/flashAlert';

const reducer = combineReducers({
  question,
  flashAlert,
  user,
  post,
});

export default reducer;
