import { combineReducers } from '@reduxjs/toolkit';

import counter from './slices/counter';

// 만들어 놓은 리듀서들을 합친다.
const reducer = combineReducers({
  counter,
});

export default reducer;
