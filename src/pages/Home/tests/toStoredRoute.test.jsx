import React from 'react';
import Home from '../Home';
import { render, cleanup } from '@testing-library/react';

describe('To Stored Route', () => {
  afterEach(cleanup);

  it('should redirect to the stored route', () => {
    const redirectUrl = '/stored';

    const { container } = render(
      <TestingRouter
        ComponentWithRedirection={() => (
          <Home auth={true} route={redirectUrl} />
        )}
        RedirectUrl={redirectUrl}
      />
    );

    expect(container.innerHTML).toEqual(expect.stringContaining(redirectUrl));
  });
});
