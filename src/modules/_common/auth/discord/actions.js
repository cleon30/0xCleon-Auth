import types from './types';

const discordRedirectSaga = () => ({ type: types.DISCORD_REDIRECT_SAGA });

const discordTokenSaga = () => ({ type: types.DISCORD_TOKEN_SAGA });

const setLocation = (location) => ({
  type: types.SET_LOCATION,
  payload: { location },
});

const setState = (state) => ({
  type: types.SET_STATE,
  payload: { state },
});

const setCode = (params) => ({
  type: types.SET_CODE,
  payload: {
    callbackState: params.state,
    code: params.code,
  },
});

const setToken = (data) => ({
  type: types.SET_TOKEN,
  payload: {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expires: data.expires_in,
  },
});

const logout = () => ({ type: types.LOGOUT });

const error = () => ({ type: types.ERROR });

export default {
  discordRedirectSaga,
  discordTokenSaga,
  setLocation,
  setState,
  setCode,
  setToken,
  logout,
  error,
};
