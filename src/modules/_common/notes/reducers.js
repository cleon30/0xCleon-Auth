import types from './types';

const initialState = {
  notifications: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.payload.key,
            ...action.payload.notification
          }
        ]
      };

    case types.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.payload.key
        )
      };
    default:
      return state;
  }
};
