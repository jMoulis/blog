import axios from 'axios';
import {
  SIGN_IN,
  SIGN_UP,
  FETCH_LOGGED_USER,
  fetchLoggedUserSuccess,
  fetchLoggedUserFailure,
} from 'store/reducers/authReducer';
import storage from 'services/storage';
import ApiResponse from './apiResponse';
import routes from './routes';

export default store => next => async action => {
  const Api = new ApiResponse(store.dispatch);

  switch (action.type) {
    case SIGN_IN: {
      try {
        const { data } = await axios(routes.user.signIn(action.values));
        Api.success(data, fetchLoggedUserSuccess, 500);
        storage.add('token', data.token);
      } catch (error) {
        Api.failure(error, fetchLoggedUserFailure);
      }
      break;
    }
    case SIGN_UP: {
      try {
        const { data } = await axios(routes.user.signUp(action.values));
        Api.success(data, fetchLoggedUserSuccess, 500);
        storage.add('token', data.token);
      } catch (error) {
        Api.failure(error, fetchLoggedUserFailure);
      }
      break;
    }
    case FETCH_LOGGED_USER: {
      try {
        const { data } = await axios(routes.user.fetchLoggedUser());
        Api.success(data, fetchLoggedUserSuccess, 500);
      } catch (error) {
        Api.failure(error, fetchLoggedUserFailure);
      }
      break;
    }
    default:
  }
  next(action);
};
