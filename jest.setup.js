import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import util from 'util';
import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import checkPropTypes from 'check-prop-types';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
});

var localStorageMock = (function() {
  var store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

Object.defineProperty(window, 'location', {
  value: {
    href: '',
    pathname: '/'
  }
});

Object.defineProperty(global, 'findByTestAttr', {
  value: (component, attr) => component.find(`[data-test='${attr}']`)
});

Object.defineProperty(global, 'checkProps', {
  value: (component, expectedProps) => {
    return checkPropTypes(
      component.propTypes,
      expectedProps,
      'props',
      component.name
    );
  }
});

Object.defineProperty(global, 'TestingRouter', {
  value: ({ ComponentWithRedirection, RedirectUrl }) => (
    <Router history={createMemoryHistory()}>
      <Route
        path='/'
        exact={true}
        render={() => <ComponentWithRedirection />}
      />
      <Route path={RedirectUrl} render={() => <div>{RedirectUrl}</div>} />
    </Router>
  )
});

Object.defineProperty(global, 'equals', {
  value: (test, code) => expect(test).toEqual(code)
});

Object.defineProperty(global, 'log', {
  value: (test, code) =>
    console.log(`
::::::::TEST:::::::: 
${util.inspect(test, false, null, true)} 

::::::::CODE:::::::: 
${util.inspect(code, false, null, true)}`)
});
