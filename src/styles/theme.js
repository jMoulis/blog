const breakpoints = { xs: 576, sm: 768, md: 992, lg: 1200 };
const mediaQueries = Object.keys(breakpoints).reduce((response, key) => {
  return {
    ...response,
    [key]: `@media (min-width: ${breakpoints[key]}px)`,
  };
}, {});
const theme = {
  colors: {
    primary: '#00C1FF', // shinyBlue
    secondary: '#0897CC', // blue
    ternary: '#0C608A', // Darkblue
    white: '#FFFFFF',
    gray: '#575859',
    cta: '#61BD4F',
    lightGray: '#e0e0e0',
    rgba: {
      primary: '0,193,255',
      secondary: '8,151,204',
      ternary: '11,96,137',
      white: '255,255,255',
      gray: '86,87,89',
      error: '244, 67, 54',
      success: '97, 189, 79',
    },
    error: '#f44336',
    success: '#61BD4F',
    warning: '#ffa500',
    info: '#0897CC',
  },
  mediaQueries,
  breakpoints,
};

export default theme;
