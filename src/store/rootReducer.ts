import { combineReducers } from '@reduxjs/toolkit';

import user from './slices/user';
import question from './slices/question';
import flashAlert from './slices/flashAlert';
import counter from './slices/counter';
import comment from './slices/comment';

// 만들어 놓은 리듀서들을 합친다.
const reducer = combineReducers({
  counter,
  question,
<<<<<<< HEAD
  flashAlert,
<<<<<<< HEAD
  user,
=======
=======
  comment,
>>>>>>> 5dccd94 (refactor: CommunityPostComments으로 변경 & props 변경)
>>>>>>> 9112700 (refactor: CommunityPostComments으로 변경 & props 변경)
});

export default reducer;
