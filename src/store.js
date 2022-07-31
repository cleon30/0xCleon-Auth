import {
  createStateSyncMiddleware,
  initStateWithPrevTab
} from 'redux-state-sync';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const initialStore = {};
const middleware = [];

const config = {};
middleware.push(createStateSyncMiddleware(config));

const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);

const store = createStore(
  rootReducer,
  initialStore,
  composeWithDevTools(applyMiddleware(...middleware))
);

initStateWithPrevTab(store);
sagaMiddleware.run(rootSaga);

export default store;

export const dispatch = action => store.dispatch(action);
