import theme from 'styled-theming';

const background = theme('mode', {
  dark: '#1f2027',
  light: '#abc2d2'
});

const backgroundColor = theme('mode', {
  dark: '#121213',
  light: '#62626f'
});

const menuBackground = theme('mode', {
  dark: '#040404',
  light: '#272727'
});

export default {
  background,
  backgroundColor,
  menuBackground
};
