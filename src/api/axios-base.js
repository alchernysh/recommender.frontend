import axios from 'axios';
import store from '../store';

const APIUrl = 'http://127.0.0.1:8000';

const axiosBase = axios.create({
  baseURL: APIUrl,
  headers: { contentType: 'application/json' },
});
const getAPI = axios.create({
  baseURL: APIUrl,
});
// eslint-disable-next-line
getAPI.interceptors.response.use(undefined, function (err) {
  // if error response status is 401, it means the request was invalid due to expired access token
  if (err.config && err.response && err.response.status === 401) {
    store.dispatch('refreshToken') // attempt to obtain new acces
      .catch(() => Promise.reject(err));
  }
});

export { axiosBase, getAPI };
