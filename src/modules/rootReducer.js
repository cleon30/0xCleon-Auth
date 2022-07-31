import { combineReducers } from 'redux';
import _common from './_common/reducers';
import { withReduxStateSync } from 'redux-state-sync';

const rootReducer = combineReducers({
  _common
  //feature1
  //feature2
  //feature3
});

export default withReduxStateSync(rootReducer);
