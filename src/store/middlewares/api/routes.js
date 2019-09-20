import storage from 'services/storage';

const token = storage.get('token');
const queryBuilder = data => {
  return Object.entries(data).reduce((acc, value, index) => {
    // set & from 2nd
    if (index === 0) {
      return `${acc}${value[0]}=${value[1]}`;
    }
    return `${acc}&${value[0]}=${value[1]}`;
  }, '?');
};

const routes = {
  user: {
    create: data => ({
      method: 'post',
      url: '/auth/signup',
      data,
    }),
  },
  post: {
    create: data => ({
      method: 'post',
      url: '/api/v1/posts',
      data,
      headers: {
        Authorization: `bearer ${token}`,
      },
    }),
    fetchPosts: ({ filter, pagination }) => {
      let url = `/api/v1/posts`;
      if (filter && filter.authorId) {
        url = `/api/v1/posts/users/${filter.authorId}`;
      }
      return {
        method: 'get',
        url: `${url}${pagination ? `${queryBuilder(pagination)}` : ''}`,
      };
    },
    fetchPost: id => ({
      method: 'get',
      url: `/api/v1/posts/${id}`,
    }),
    patch: (id, data) => ({
      method: 'patch',
      url: `/api/v1/posts/${id}`,
      data,
      headers: {
        Authorization: `bearer ${token}`,
      },
    }),
    deletePost: id => ({
      method: 'delete',
      url: `/api/v1/posts/${id}`,
      headers: {
        Authorization: `bearer ${token}`,
      },
    }),
  },
};

export default routes;
