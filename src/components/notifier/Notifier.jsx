import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { actions } from '../../modules/_common/notes';

let displayed = [];

const Notifier = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(store => store._common.notes.notifications);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = id => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = id => {
    displayed = [...displayed.filter(key => id !== key)];
  };

  React.useEffect(() => {
    const { clearNotification } = actions;
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          closeSnackbar(key);
          return;
        }

        if (displayed.includes(key)) return;

        enqueueSnackbar(message, {
          key,
          ...options,
          onExited: (event, myKey) => {
            dispatch(clearNotification(myKey));
            removeDisplayed(myKey);
          }
        });

        storeDisplayed(key);
      }
    );
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

  return null;
};

export default Notifier;
