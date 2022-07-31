import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  useEffect(() => {
    rest.location.pathname !== '/dashboard' &&
      localStorage.setItem('route', rest.location.pathname);
    // eslint-disable-next-line
  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        auth ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
