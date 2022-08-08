import { combineReducers } from '@reduxjs/toolkit';

import user from './slices/user';
import question from './slices/question';
import flashAlert from './slices/flashAlert';
import counter from './slices/counter';

// 만들어 놓은 리듀서들을 합친다.
const reducer = combineReducers({
  counter,
  question,
  flashAlert,
  user,
});

export default reducer;
