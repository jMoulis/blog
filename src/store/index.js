import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from 'store/reducers/authReducer';

import authApi from 'store/middlewares/api/authApi';

const rootReducer = combineReducers({
  authReducer,
});
const composedEnhancers = composeWithDevTools(applyMiddleware(authApi));

const store = createStore(rootReducer, composedEnhancers);

export default store;
