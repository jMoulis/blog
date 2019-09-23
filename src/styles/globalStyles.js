import { css } from '@emotion/core';

export default css`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    font-family: 'roboto', sans-serif;
    color: gray;
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
`;
