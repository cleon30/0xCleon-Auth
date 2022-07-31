import React from 'react';
import PrivateRoute from '../PrivateRoute';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';

describe('Stored Path', () => {
  afterEach(cleanup);

  it('should store the current pathname', () => {
    const storedValue = '/stored';
    global.location.pathname = storedValue;

    render(
      <Router>
        <PrivateRoute
          location={global.location}
          component={() => <div />}
          auth={true}
        />
      </Router>
    );

    expect(storedValue).toEqual(global.localStorage.getItem('route'));
  });
});
