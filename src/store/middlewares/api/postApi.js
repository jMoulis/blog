import axios from 'axios';
import {
  CREATE_POST,
  createPostSuccess,
  createPostFailure,
} from 'store/reducers/postReducer';

import routes from './routes';
import ApiResponse from './apiResponse';

export default store => next => async action => {
  const Api = new ApiResponse(store.dispatch);
  switch (action.type) {
    case CREATE_POST: {
      try {
        const { data } = await axios(routes.post.create(action.payload));
        Api.success(data, createPostSuccess, 500);
      } catch (error) {
        Api.failure(error, createPostFailure);
      }
      break;
    }
    default:
  }
  next(action);
};
