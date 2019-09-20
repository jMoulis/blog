import axios from 'axios';
import {
  CREATE_POST,
  createPostSuccess,
  createPostFailure,
  EDIT_POST,
  editPostSuccess,
  editPostFailure,
  FETCH_POSTS,
  fetchPostsSuccess,
  fetchPostsFailure,
  FETCH_POST,
  fetchPostSuccess,
  fetchPostFailure,
  DELETE_POST,
  deletePostFailure,
  deletePostSuccess,
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
    case EDIT_POST: {
      try {
        const { values, id } = action.payload;
        const { data } = await axios(routes.post.patch(id, values));
        Api.success(data, editPostSuccess, 1000);
      } catch (error) {
        Api.failure(error, editPostFailure);
      }
      break;
    }
    case FETCH_POSTS: {
      try {
        const { filter, pagination } = action.payload;
        const { data } = await axios(
          routes.post.fetchPosts({ filter, pagination } || null),
        );
        Api.success(data, fetchPostsSuccess, 500);
      } catch (error) {
        Api.failure(error, fetchPostsFailure);
      }
      break;
    }
    case FETCH_POST: {
      try {
        const { id } = action;
        const { data } = await axios(routes.post.fetchPost(id));
        Api.success(data, fetchPostSuccess);
      } catch (error) {
        Api.failure(error, fetchPostFailure);
      }
      break;
    }
    case DELETE_POST: {
      try {
        const { id } = action;
        const { data } = await axios(routes.post.deletePost(id));
        Api.success(data, deletePostSuccess);
      } catch (error) {
        Api.failure(error, deletePostFailure);
      }
      break;
    }
    default:
  }
  next(action);
};
