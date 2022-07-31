import { combineReducers } from 'redux';
import auth from './auth/reducers';
import notes from './notes/reducers';

const _common = combineReducers({
  auth,
  notes
});

export default _common;
