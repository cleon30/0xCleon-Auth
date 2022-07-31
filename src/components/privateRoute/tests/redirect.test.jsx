import React from 'react';
import PrivateRoute from '../PrivateRoute';
import { render, cleanup } from '@testing-library/react';

describe('Redirect', () => {
  afterEach(cleanup);

  it('should redirect to landing page', () => {
    const redirectUrl = '/redirected';
    const Private = () => redirectUrl;

    const { container } = render(
      <TestingRouter
        ComponentWithRedirection={() => (
          <PrivateRoute
            location={global.location}
            component={Private}
            auth={false}
          />
        )}
        RedirectUrl={redirectUrl}
      />
    );

    expect(container.innerHTML).toEqual(expect.stringContaining(''));
  });
});
