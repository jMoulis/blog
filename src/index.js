import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Global } from '@emotion/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyles, Theme } from 'styles';
import { ThemeProvider } from 'emotion-theming';
import store from 'store';
import App from 'components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Global styles={GlobalStyles} />
      <ThemeProvider theme={Theme}>
        <Suspense fallback={<span />}>
          <App />
        </Suspense>
      </ThemeProvider>
    </Provider>
  </Router>,
  document.getElementById('root'),
);

serviceWorker.unregister();
