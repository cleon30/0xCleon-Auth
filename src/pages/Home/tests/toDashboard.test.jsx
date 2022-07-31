import React from 'react';
import Home from '../Home';
import { render, cleanup } from '@testing-library/react';

describe('To Dashboard', () => {
  afterEach(cleanup);

  it('should redirect to the dashboard', () => {
    const redirectUrl = '/dashboard';

    const { container } = render(
      <TestingRouter
        ComponentWithRedirection={() => <Home auth={true} route={null} />}
        RedirectUrl={redirectUrl}
      />
    );

    expect(container.innerHTML).toEqual(expect.stringContaining(redirectUrl));
  });
});
