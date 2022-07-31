import React from 'react';
import PrivateRoute from '../PrivateRoute';
import { render, cleanup } from '@testing-library/react';

describe('Forward', () => {
  afterEach(cleanup);

  it('should forward to requested component', () => {
    const redirectUrl = '/redirected';
    const Private = () => redirectUrl;

    const { container } = render(
      <TestingRouter
        ComponentWithRedirection={() => (
          <PrivateRoute
            location={global.location}
            component={Private}
            auth={true}
          />
        )}
        RedirectUrl={redirectUrl}
      />
    );

    expect(container.innerHTML).toEqual(expect.stringContaining('/redirected'));
  });
});
