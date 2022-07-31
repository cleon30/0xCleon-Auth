import types from './types';

const notify = (message, variant) => ({
  type: types.ENQUEUE_SNACKBAR,
  payload: {
    key: message,
    notification: {
      message,
      options: {
        variant
      }
    }
  }
});

const clearNotification = key => ({
  type: types.REMOVE_SNACKBAR,
  payload: {
    key
  }
});

export default {
  notify,
  clearNotification
};
