import { fork } from 'redux-saga/effects';

import {
  discordRedirect_Watcher,
  discordToken_Watcher
} from './_common/auth/discord/sagas';

export default function* rootSaga() {
  yield fork(discordRedirect_Watcher);
  yield fork(discordToken_Watcher);
}
