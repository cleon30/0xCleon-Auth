import { take, takeLatest, call, put } from 'redux-saga/effects';
import types from './types';
import actions from './actions';
import { actions as noteActions } from '../../notes';
import { authorize_GET, token_POST } from '../../../../api/discord/auth';
import axios from 'axios';

export function* discordRedirect_Watcher() {
  yield takeLatest(types.DISCORD_REDIRECT_SAGA, discordRedirect);
}

export function* discordRedirect() {
  const action = yield take(types.SET_STATE);
  const request = yield call(authorize_GET, action.payload.state);
  localStorage.setItem('generatedState', action.payload.state);
  window.location.href = request;
}

export function* discordToken_Watcher() {
  yield takeLatest(types.DISCORD_TOKEN_SAGA, discordToken);
}

export function* discordToken() {
  const action = yield take(types.SET_CODE);
  const generatedState = localStorage.getItem('generatedState');
  const callbackState = action.payload.callbackState;

  if (yield callbackState !== generatedState) {
    yield put(noteActions.notify('Received false state parameter', 'error'));
    yield put(actions.error());
    return;
  }

  try {
    const req = yield call(token_POST, action.payload.code);
    const response = yield call(axios.post, req.url, req.body, req.headers);
    yield put(actions.setToken(response.data));
    localStorage.removeItem('generatedState');
  } catch (error) {
    const data = error.response.data;
    yield put(
      noteActions.notify(`${data.error}: ${data.error_description}`, 'error')
    );
    yield put(actions.error());
  }
}
