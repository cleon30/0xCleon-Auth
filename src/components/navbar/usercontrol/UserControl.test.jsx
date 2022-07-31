import React from 'react';
import { shallow } from 'enzyme';
import UserControl from './UserControl';

describe('UserControl Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a warning', () => {
      const expectedProps = { auth: false };
      const propsError = checkProps(UserControl, expectedProps);
      expect(propsError).toBeUndefined();
    });

    it('Should throw a warning', () => {
      const expectedProps = { auth: 'String' };
      const propsError = checkProps(UserControl, expectedProps);
      expect(propsError).not.toBeUndefined();
    });
  });

  describe('Renders', () => {
    it('Should Render a UserMenu Component', () => {
      const component = shallow(<UserControl auth={true} />);
      const userMenu = findByTestAttr(component, 'userMenuComponent');
      expect(userMenu.length).toBe(1);
    });

    it('Should NOT Render a UserMenu Component', () => {
      const component = shallow(<UserControl auth={false} />);
      const userMenu = findByTestAttr(component, 'userMenuComponent');
      expect(userMenu.length).toBe(0);
    });

    it('Should Render a Login Component', () => {
      const component = shallow(<UserControl auth={false} />);
      const login = findByTestAttr(component, 'loginComponent');
      expect(login.length).toBe(1);
    });

    it('Should NOT Render a Login Component', () => {
      const component = shallow(<UserControl auth={true} />);
      const login = findByTestAttr(component, 'loginComponent');
      expect(login.length).toBe(0);
    });
  });
});
