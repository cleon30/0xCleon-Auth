import { dispatch } from '../../../../store';
import queryString from 'query-string';
import { random } from './utils';
import actions from './actions';

const redirect = () => {
  dispatch(actions.discordRedirectSaga());
  dispatch(actions.setState(random(16)));
};

const callback = (url) => {
  dispatch(actions.discordTokenSaga());
  dispatch(actions.setCode(queryString.parse(url)));
};

const logout = () => {
  dispatch(actions.logout());
  localStorage.removeItem('route');
};

export default {
  redirect,
  callback,
  logout,
};
