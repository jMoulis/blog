import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Global } from '@emotion/core';
import { GlobalStyles, Theme } from 'styles';
import { ThemeProvider } from 'emotion-theming';
import App from 'components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <>
    <Global styles={GlobalStyles} />
    <ThemeProvider theme={Theme}>
      <Suspense fallback={<span>Error while loading theme</span>}>
        <App />
      </Suspense>
    </ThemeProvider>
  </>,
  document.getElementById('root'),
);

serviceWorker.unregister();
