import React from 'react';
import { shallow } from 'enzyme';
import _common from '../../../../modules/_common/auth/discord';
import Login from './Login';

describe('Login Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a warning', () => {
      const expectedProps = { redirect: jest.fn() };
      const propsError = checkProps(Login, expectedProps);
      expect(propsError).toBeUndefined();
    });

    it('Should throw a warning', () => {
      const expectedProps = { redirect: 'String' };
      const propsError = checkProps(Login, expectedProps);
      expect(propsError).not.toBeUndefined();
    });
  });

  describe('Renders', () => {
    let wrapper;
    let mockCallBack;
    beforeEach(() => {
      mockCallBack = jest.fn();
      wrapper = shallow(<Login redirect={mockCallBack} />);
    });

    it('Should Render a login button', () => {
      const button = findByTestAttr(wrapper, 'loginButton');
      expect(button.length).toBe(1);
    });

    it('should simulate click events', () => {
      const button = findByTestAttr(wrapper, 'loginButton');
      button.simulate('click');
      expect(mockCallBack.mock.calls.length).toEqual(1);
    });
  });
});
