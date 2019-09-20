export const SIGN_IN = 'SIGN_IN';
export const LOGOUT = 'LOGOUT';

export const FETCH_LOGGED_USER = 'FETCH_LOGGED_USER';
export const FETCH_LOGGED_USER_SUCCESS = 'FETCH_LOGGED_USER_SUCCESS';
export const FETCH_LOGGED_USER_FAILURE = 'FETCH_LOGGED_USER_FAILURE';

export const EDIT_LOGGED_USER = 'EDIT_LOGGED_USER';
export const EDIT_LOGGED_USER_SUCCESS = 'EDIT_LOGGED_USER_SUCCESS';
export const EDIT_LOGGED_USER_FAILURE = 'EDIT_LOGGED_USER_FAILURE';

export const DELETE_LOGGED_USER = 'DELETE_LOGGED_USER';
export const DELETE_LOGGED_USER_SUCCESS = 'DELETE_LOGGED_USER_SUCCESS';
export const DELETE_LOGGED_USER_FAILURE = 'DELETE_LOGGED_USER_FAILURE';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const RESET_SUCCESS_ERROR = 'RESET_SUCCESS_ERROR';

const initialState = {
  isLogged: false,
  loggedUser: null,
  error: null,
  loading: false,
  success: false,
  reset: {
    success: null,
    error: null,
    loading: false,
  },
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGN_IN: {
      return { ...state, isLogged: false, loading: true };
    }
    case FETCH_LOGGED_USER: {
      return { ...state, loading: true };
    }
    case FETCH_LOGGED_USER_SUCCESS: {
      return {
        ...state,
        isLogged: true,
        loggedUser: action.payload.user,
        loading: false,
        error: null,
      };
    }
    case FETCH_LOGGED_USER_FAILURE: {
      return {
        ...state,
        isLogged: false,
        error: { ...action.payload.error },
        loading: false,
      };
    }

    case EDIT_LOGGED_USER: {
      return { ...state, loading: true };
    }

    case EDIT_LOGGED_USER_SUCCESS: {
      return {
        ...state,
        error: null,
        isLogged: true,
        loggedUser: action.payload.user,
        loading: false,
        success: true,
      };
    }
    case EDIT_LOGGED_USER_FAILURE: {
      return {
        ...state,
        error: { ...action.payload.error },
        loading: false,
        success: false,
      };
    }
    case DELETE_LOGGED_USER: {
      return { ...state, loading: true };
    }

    case DELETE_LOGGED_USER_SUCCESS: {
      return {
        ...state,
        error: null,
        loading: false,
        deleteMessage: action.payload.message,
      };
    }
    case DELETE_LOGGED_USER_FAILURE: {
      return {
        ...state,
        error: { ...action.payload.error },
        loading: false,
        success: false,
      };
    }
    case LOGOUT: {
      window.localStorage.removeItem('token');
      return {
        ...state,
        isLogged: false,
        loggedUser: null,
        loading: false,
        deleteMessage: null,
      };
    }
    case RESET_SUCCESS_ERROR: {
      return {
        ...state,
        error: null,
        success: false,
        reset: {
          success: null,
          error: null,
        },
      };
    }
    case RESET_PASSWORD: {
      return { ...state, reset: { ...state.reset, loading: true } };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        reset: {
          success: action.payload,
          error: null,
          loading: false,
        },
      };
    }
    case RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        reset: {
          success: null,
          error: action.payload,
          loading: false,
        },
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default reducer;

export const signIn = values => ({
  type: SIGN_IN,
  values,
});

export const logout = () => ({
  type: LOGOUT,
});

export const resetPassword = values => ({
  type: RESET_PASSWORD,
  values,
});
export const resetPasswordSuccess = payload => ({
  type: RESET_PASSWORD_SUCCESS,
  payload,
});
export const resetPasswordFailure = error => ({
  type: RESET_PASSWORD_FAILURE,
  payload: error,
});

export const fetchLoggedUser = () => ({
  type: FETCH_LOGGED_USER,
});
export const fetchLoggedUserSuccess = payload => ({
  type: FETCH_LOGGED_USER_SUCCESS,
  payload,
});
export const fetchLoggedUserFailure = error => ({
  type: FETCH_LOGGED_USER_FAILURE,
  payload: error,
});

export const editLoggedUser = payload => ({
  type: EDIT_LOGGED_USER,
  payload,
});
export const editLoggedUserSuccess = payload => ({
  type: EDIT_LOGGED_USER_SUCCESS,
  payload,
});
export const editLoggedUserFailure = error => ({
  type: EDIT_LOGGED_USER_FAILURE,
  payload: error,
});

export const deleteLoggedUser = payload => ({
  type: DELETE_LOGGED_USER,
  payload,
});
export const deleteLoggedUserSuccess = payload => ({
  type: DELETE_LOGGED_USER_SUCCESS,
  payload,
});
export const deleteLoggedUserFailure = error => ({
  type: DELETE_LOGGED_USER_FAILURE,
  payload: error,
});

export const resetSuccessError = () => ({
  type: RESET_SUCCESS_ERROR,
});
