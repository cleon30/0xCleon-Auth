import moxios from 'moxios';
import SagaTester from 'redux-saga-tester';
import { take, call } from 'redux-saga/effects';
import { discordRedirect, discordToken } from './auth/discord/sagas';

import types from './auth/discord/types';
import actions from './auth/discord/actions';
import _common from './reducers';
import { types as errorTypes, actions as notifyActions } from './notes';

import { random } from './auth/discord/utils';
import { authorize_GET } from '../../api/discord/auth';

describe('Discord-OAuth Flow', () => {
  let url;
  const gen = discordRedirect();

  describe('Before Discord Redirect-Popup appears', () => {
    it(`Should generate a random 'state' for the Discord-Request`, () => {
      const test = take(types.SET_STATE);
      const code = gen.next().value;
      equals(code, test);
    });

    it(`Should generate the full Discord-Request`, () => {
      const action = actions.setState(random(16));
      url = call(authorize_GET, action.payload.state);

      const test = url;
      const code = gen.next(action).value;
      equals(code, test);
    });

    it(`Should be done`, () => {
      const test = true;
      const code = gen.next().done;
      equals(code, test);
    });
  });

  describe('After Discord-Authorization happened in Redirect-Popup', () => {
    let sagaTester = null;

    let initialState = {
      _common: {
        auth: {
          discord: {
            code: null,
            callbackState: null,
            authenticated: false,
            accessToken: null,
            refreshToken: null,
            expires: null
          }
        }
      }
    };

    let initialData = {
      code: '1dTsXf2Y1GHLk9GCMS9OMSZeqk96et',
      state: '9346bf40fa45604f05187aa836a86bd1'
    };

    let expectedState = {
      _common: {
        auth: {
          discord: {
            code: null,
            callbackState: null,
            authenticated: true,
            accessToken: 'ICrmFNYFMHqFCz1hHGYciuZJnLelUV',
            refreshToken: 'bw55GaeySPLLpRIcaEJxllJBkga76F',
            expires: 604800
          }
        },
        notes: {
          notifications: []
        }
      }
    };

    let expectedData = {
      access_token: 'ICrmFNYFMHqFCz1hHGYciuZJnLelUV',
      refresh_token: 'bw55GaeySPLLpRIcaEJxllJBkga76F',
      expires_in: 604800
    };

    beforeEach(() => {
      moxios.install();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: expectedData
        });
      });

      sagaTester = new SagaTester({
        initialState,
        reducers: { _common }
      });

      global.localStorage.setItem(
        'generatedState',
        '9346bf40fa45604f05187aa836a86bd1'
      );

      sagaTester.start(discordToken);
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('Should grant Access/Refresh-Token & push to store', async () => {
      sagaTester.dispatch(actions.setCode(initialData));
      const successAction = await sagaTester.waitFor(types.SET_TOKEN);

      equals(successAction, actions.setToken(expectedData));
      equals(sagaTester.getState(), expectedState);
    });
  });
});

describe('Detect potential CSFR-Attack', () => {
  let sagaTester = null;

  let initialState = {
    _common: {
      auth: {
        discord: {
          code: null,
          callbackState: null,
          authenticated: false,
          accessToken: null,
          refreshToken: null,
          expires: null
        }
      },
      notes: {
        notifications: []
      }
    }
  };

  let initialData = {
    code: '1dTsXf2Y1GHLk9GCMS9OMSZeqk96et',
    state: '9346bf40fa45604f05187aa836a86bd1'
  };

  let expectedState = {
    _common: {
      auth: {
        discord: {
          code: null,
          callbackState: null,
          authenticated: false,
          accessToken: null,
          refreshToken: null,
          expires: null
        }
      },
      notes: {
        notifications: [
          {
            key: 'Received false state parameter',
            message: 'Received false state parameter',
            options: {
              variant: 'error'
            }
          }
        ]
      }
    }
  };

  beforeEach(() => {
    sagaTester = new SagaTester({
      initialState,
      reducers: { _common }
    });

    global.localStorage.setItem('generatedState', 'CSFR_ATTACK');

    sagaTester.start(discordToken);
  });

  afterEach(() => {
    global.localStorage.removeItem('generatedState');
  });

  it('Should reset auth_Discord state after CSFR-Attack', async () => {
    sagaTester.dispatch(actions.setCode(initialData));

    let successAction = await sagaTester.waitFor(errorTypes.ENQUEUE_SNACKBAR);
    equals(
      successAction,
      notifyActions.notify('Received false state parameter', 'error')
    );

    successAction = await sagaTester.waitFor(types.ERROR);
    equals(successAction, actions.error());

    equals(sagaTester.getState(), expectedState);
  });
});

describe('Notify User when request fails', () => {
  let sagaTester = null;

  let initialState = {
    _common: {
      auth: {
        discord: {
          code: null,
          callbackState: null,
          authenticated: false,
          accessToken: null,
          refreshToken: null,
          expires: null
        }
      },
      notes: {
        notifications: []
      }
    }
  };

  let initialData = {
    code: 'BAD_REQUEST',
    state: '9346bf40fa45604f05187aa836a86bd1'
  };

  let expectedState = {
    _common: {
      auth: {
        discord: {
          code: null,
          callbackState: null,
          authenticated: false,
          accessToken: null,
          refreshToken: null,
          expires: null
        }
      },
      notes: {
        notifications: [
          {
            key: `invalid_request: Invalid "code" in request.`,
            message: `invalid_request: Invalid "code" in request.`,
            options: {
              variant: 'error'
            }
          }
        ]
      }
    }
  };

  beforeEach(() => {
    moxios.install();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 400,
        response: {
          data: {
            error: 'invalid_request',
            error_description: `Invalid "code" in request.`
          }
        }
      });
    });

    sagaTester = new SagaTester({
      initialState,
      reducers: { _common }
    });

    global.localStorage.setItem(
      'generatedState',
      '9346bf40fa45604f05187aa836a86bd1'
    );

    sagaTester.start(discordToken);
  });

  afterEach(() => {
    global.localStorage.removeItem('generatedState');
    moxios.uninstall();
  });

  it('Should return Error 400 with corresponding notification', async () => {
    sagaTester.dispatch(actions.setCode(initialData));

    let successAction = await sagaTester.waitFor(errorTypes.ENQUEUE_SNACKBAR);
    equals(
      successAction,
      notifyActions.notify(
        `invalid_request: Invalid "code" in request.`,
        'error'
      )
    );

    successAction = await sagaTester.waitFor(types.ERROR);
    equals(successAction, actions.error());

    equals(sagaTester.getState(), expectedState);
  });
});
