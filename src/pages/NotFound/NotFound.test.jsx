import React from 'react';
import NotFound from './NotFound';
import { render, cleanup } from '@testing-library/react';

describe('To Login', () => {
  afterEach(cleanup);

  it('should redirect to login', () => {
    const redirectUrl = '/login';

    const { container } = render(
      <TestingRouter
        ComponentWithRedirection={() => <NotFound />}
        RedirectUrl={redirectUrl}
      />
    );

    expect(container.innerHTML).toEqual(expect.stringContaining(redirectUrl));
  });
});
