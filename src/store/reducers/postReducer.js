export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

const statusInitialState = {
  error: null,
  created: false,
  creating: false,
};

const initialState = {
  ...statusInitialState,
  createdPost: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_POST: {
      return { ...state, creating: true };
    }
    case CREATE_POST_SUCCESS: {
      return {
        ...state,
        createdPost: action.payload.post,
        created: true,
        error: null,
        creating: false,
      };
    }
    case CREATE_POST_FAILURE: {
      return {
        ...state,
        created: false,
        creating: false,
        error: { ...action.payload.error },
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default reducer;

export const createPost = values => ({
  type: CREATE_POST,
  payload: values,
});
export const createPostSuccess = payload => ({
  type: CREATE_POST_SUCCESS,
  payload,
});
export const createPostFailure = error => ({
  type: CREATE_POST_FAILURE,
  payload: error,
});
