import types from './types';

const initialState = {
  code: null,
  callbackState: null,
  authenticated: false,
  accessToken: null,
  refreshToken: null,
  expires: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CODE:
      return {
        ...state,
        code: action.payload.code,
        callbackState: action.payload.callbackState,
      };
    case types.SET_TOKEN:
      return {
        ...state,
        code: null,
        callbackState: null,
        authenticated: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        expires: action.payload.expires,
      };
    case types.LOGOUT:
      return {
        ...state,
        authenticated: false,
        accessToken: null,
        refreshToken: null,
        expires: null,
      };
    case types.ERROR:
      return initialState;
    default:
      return state;
  }
};
