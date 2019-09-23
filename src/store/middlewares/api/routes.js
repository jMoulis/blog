import storage from 'services/storage';

const token = storage.get('token');
const ROOT_API = process.env.REACT_APP_ROOT_API;
console.log(ROOT_API);
const routes = {
  user: {
    signUp: data => ({
      method: 'post',
      url: `${ROOT_API}/auth/signup`,
      data,
    }),
    signIn: data => ({
      method: 'post',
      url: `${ROOT_API}/auth/signin`,
      data,
    }),
    fetchLoggedUser: () => ({
      method: 'get',
      url: `${ROOT_API}/auth/logged_user`,
      headers: {
        Authorization: `bearer ${token}`,
      },
    }),
  },
};

export default routes;
