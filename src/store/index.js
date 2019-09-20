import { createStore, combineReducers, applyMiddleware } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import postReducer from 'store/reducers/postReducer';
import commentReducer from 'store/reducers/commentReducer';
import authReducer from 'store/reducers/authReducer';

import authApi from 'store/middlewares/api/authApi';
import postApi from 'store/middlewares/api/postApi';

const rootReducer = combineReducers({
  postReducer,
  commentReducer,
  authReducer,
});
const composedEnhancers = composeWithDevTools(
  applyMiddleware(authApi),
  applyMiddleware(postApi),
);

const store = createStore(rootReducer, composedEnhancers);

export default store;
