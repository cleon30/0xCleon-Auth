import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './Navbar';

describe('UserControl Component', () => {
  describe('Checking PropTypes', () => {
    it('Should NOT throw a warning', () => {
      const expectedProps = { auth: false };
      const propsError = checkProps(Navbar, expectedProps);
      expect(propsError).toBeUndefined();
    });

    it('Should throw a warning', () => {
      const expectedProps = { auth: 'String' };
      const propsError = checkProps(Navbar, expectedProps);
      expect(propsError).not.toBeUndefined();
    });
  });

  describe('Renders', () => {
    it('Should Render a Navbar', () => {
      const component = shallow(<Navbar auth={true} />);
      const userMenu = findByTestAttr(component, 'logoComponent');
      expect(userMenu.length).toBe(1);
      const userControl = findByTestAttr(component, 'userControlComponent');
      expect(userControl.length).toBe(1);
    });

    it('Should Render an UNauthenticated Navbar', () => {
      const component = shallow(<Navbar auth={false} />)
        .childAt(1)
        .dive();

      const login = findByTestAttr(component, 'loginComponent');
      expect(login.length).toBe(1);
    });

    it('Should Render an authenticated Navbar', () => {
      const component = shallow(<Navbar auth={true} />)
        .childAt(1)
        .dive();

      const userMenu = findByTestAttr(component, 'userMenuComponent');
      expect(userMenu.length).toBe(1);
    });
  });
});
