export const SIGN_IN = 'SIGN_IN';
export const SIGN_UP = 'SIGN_UP';
export const LOGOUT = 'LOGOUT';

export const FETCH_LOGGED_USER = 'FETCH_LOGGED_USER';
export const FETCH_LOGGED_USER_SUCCESS = 'FETCH_LOGGED_USER_SUCCESS';
export const FETCH_LOGGED_USER_FAILURE = 'FETCH_LOGGED_USER_FAILURE';

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
    case SIGN_UP: {
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

export const signUp = values => ({
  type: SIGN_UP,
  values,
});

export const logout = () => ({
  type: LOGOUT,
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
