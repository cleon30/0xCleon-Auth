import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store';

import { SnackbarProvider } from 'notistack';
import { Provider as StoreProvider } from 'react-redux';

ReactDOM.render(
  <StoreProvider store={store}>
    <SnackbarProvider>
      <App/>
    </SnackbarProvider>
  </StoreProvider>,
  document.getElementById('root')
);
