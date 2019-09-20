import { css } from '@emotion/core';
import theme from './theme';

export default css`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    font-family: 'roboto', sans-serif;
    color: ${theme.colors.gray};
  }
  html {
    font-size: 62.5%;
    height: 100%;
  }
  body {
    box-sizing: border-box;
    font-size: 1.5rem;
    height: inherit;
  }
  #root {
    display: flex;
    height: inherit;
  }

  .ql-editor .ql-size-huge {
    font-size: 10rem;
  }
  .ql-font-roboto {
    font-family: 'roboto', sans-serif;
    font-weight: 400;
  }
  .ql-font-baloo {
    font-family: 'Baloo Thambi', cursive;
  }
  .ql-font span[data-label='roboto']::before {
    font-family: 'roboto';
  }
  .ql-font span[data-label='Baloo']::before {
    font-family: 'Baloo Thambi';
  }
`;
