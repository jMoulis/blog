import axios from 'axios';
import {
  SIGN_IN,
  FETCH_LOGGED_USER,
  EDIT_LOGGED_USER,
  DELETE_LOGGED_USER,
  RESET_PASSWORD,
  fetchLoggedUserSuccess,
  fetchLoggedUserFailure,
  editLoggedUserSuccess,
  editLoggedUserFailure,
  deleteLoggedUserSuccess,
  deleteLoggedUserFailure,
  resetPasswordSuccess,
  resetPasswordFailure,
} from 'store/reducers/authReducer';
import storage from 'services/storage';
import ApiResponse from './apiResponse';

export default store => next => action => {
  const Api = new ApiResponse(store.dispatch);

  switch (action.type) {
    case SIGN_IN: {
      const url = '/auth/signin';
      axios({
        method: 'post',
        url,
        data: action.values,
      })
        .then(({ data }) => {
          Api.success(data, fetchLoggedUserSuccess, 500);
          storage.add('token', data.token);
        })
        .catch(error => {
          Api.failure(error, fetchLoggedUserFailure, 500);
        });
      break;
    }
    case FETCH_LOGGED_USER: {
      const url = '/auth/logged_user';
      const token = storage.get('token');
      axios({
        method: 'get',
        url,
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
        .then(({ data }) => {
          store.dispatch(fetchLoggedUserSuccess(data));
        })
        .catch(error => {
          store.dispatch(fetchLoggedUserFailure({ ...error.response }));
        });
      break;
    }
    case EDIT_LOGGED_USER: {
      const url = `/api/v1/user/${action.payload.userId}`;
      const token = storage.get('token');
      const formData = new FormData();
      Object.entries(action.payload.values).forEach(entry => {
        if (
          (typeof entry[1] === 'object' || Array.isArray(typeof entry[1])) &&
          entry[0] !== 'photo'
        ) {
          formData.append(entry[0], JSON.stringify(entry[1]));
        } else {
          formData.append(entry[0], entry[1]);
        }
      });
      axios({
        method: 'patch',
        url,
        data: formData,
        headers: {
          Authorization: `bearer ${token}`,
          'Content-type': 'multipart/form-data',
        },
      })
        .then(({ data }) => {
          Api.success(data, editLoggedUserSuccess);
        })
        .catch(error => {
          Api.failure(error, editLoggedUserFailure);
        });
      break;
    }
    case DELETE_LOGGED_USER: {
      const url = `/api/v1/user/delete/${action.payload.userId}`;
      const token = storage.get('token');
      axios({
        method: 'patch',
        url,
        data: action.payload.values,
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
        .then(({ data }) => {
          Api.success(data, deleteLoggedUserSuccess, 1000);
        })
        .catch(error => {
          Api.failure(error, deleteLoggedUserFailure, 1000);
        });
      break;
    }
    case RESET_PASSWORD: {
      const url = `/auth/reset`;
      axios({
        method: 'post',
        url,
        data: action.values,
      })
        .then(({ data }) => {
          store.dispatch(resetPasswordSuccess(data.success));
        })
        .catch(({ response, message }) => {
          if (response) {
            return store.dispatch(resetPasswordFailure(response.data.error));
          }
          return store.dispatch(resetPasswordFailure(message));
        });
      break;
    }
    default:
  }
  next(action);
};
