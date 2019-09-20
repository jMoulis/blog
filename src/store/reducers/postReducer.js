export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const EDIT_POST = 'EDIT_POST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';

export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';

export const EMPTY_POSTS = 'EMPTY_POSTS';
export const EMPTY_POST = 'EMPTY_POST';

export const RESET_SUCCESS_AND_ERROR = 'RESET_SUCCESS_AND_ERROR';

const statusInitialState = {
  error: null,
  created: false,
  creating: false,
  editing: false,
  edited: false,
  fetching: false,
  deleting: false,
  deleted: false,
};

const initialState = {
  ...statusInitialState,
  createdPost: null,
  currentPost: null,
  posts: null,
  post: null,
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
    case EDIT_POST: {
      return { ...state, editing: true };
    }
    case EDIT_POST_SUCCESS: {
      return {
        ...state,
        edited: true,
        error: null,
        editing: false,
        currentPost: action.payload.post,
      };
    }
    case EDIT_POST_FAILURE: {
      return {
        ...state,
        edited: false,
        editing: false,
        error: { ...action.payload.error },
      };
    }
    case FETCH_POSTS: {
      return { ...state, fetching: true };
    }
    case FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.payload.posts,
        pagination: action.payload.pagination,
        error: null,
        fetching: false,
      };
    }
    case FETCH_POSTS_FAILURE: {
      return {
        ...state,
        posts: [],
        fetching: false,
        error: { ...action.payload.error },
      };
    }
    case FETCH_POST: {
      return { ...state, fetching: true };
    }
    case FETCH_POST_SUCCESS: {
      return {
        ...state,
        post: action.payload.post,
        error: null,
        fetching: false,
      };
    }
    case FETCH_POST_FAILURE: {
      return {
        ...state,
        post: null,
        fetching: false,
        error: { ...action.payload.error },
      };
    }
    case DELETE_POST: {
      return { ...state, deleting: true };
    }
    case DELETE_POST_SUCCESS: {
      return {
        ...state,
        post: null,
        error: null,
        deleting: false,
        deleted: true,
      };
    }
    case DELETE_POST_FAILURE: {
      return {
        ...state,
        post: null,
        deleting: false,
        error: { ...action.payload.error },
      };
    }
    case RESET_SUCCESS_AND_ERROR: {
      return {
        ...state,
        ...statusInitialState,
      };
    }
    case EMPTY_POSTS: {
      return {
        ...state,
        posts: null,
      };
    }
    case EMPTY_POST: {
      return {
        ...state,
        post: null,
        ...statusInitialState,
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

export const editPost = (id, values) => ({
  type: EDIT_POST,
  payload: { id, values },
});
export const editPostSuccess = payload => ({
  type: EDIT_POST_SUCCESS,
  payload,
});
export const editPostFailure = error => ({
  type: EDIT_POST_FAILURE,
  payload: error,
});

export const deletePost = id => ({
  type: DELETE_POST,
  id,
});
export const deletePostSuccess = payload => ({
  type: DELETE_POST_SUCCESS,
  payload,
});
export const deletePostFailure = error => ({
  type: DELETE_POST_FAILURE,
  payload: error,
});

export const fetchPosts = (filter, pagination) => ({
  type: FETCH_POSTS,
  payload: { filter, pagination },
});
export const fetchPostsSuccess = payload => ({
  type: FETCH_POSTS_SUCCESS,
  payload,
});
export const fetchPostsFailure = error => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

export const fetchPost = id => ({
  type: FETCH_POST,
  id,
});
export const fetchPostSuccess = payload => ({
  type: FETCH_POST_SUCCESS,
  payload,
});
export const fetchPostFailure = error => ({
  type: FETCH_POST_FAILURE,
  payload: error,
});

export const resetSuccessAndError = () => ({
  type: RESET_SUCCESS_AND_ERROR,
});

export const emptyPosts = () => ({
  type: EMPTY_POSTS,
});
export const emptyPost = () => ({
  type: EMPTY_POST,
});
