import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { initSentry } from './util';
import { darkTheme } from './themes';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { PersistGate } from 'redux-persist/integration/react';
import registerServiceWorker from './sw/registerServiceWorker';
import './_index.scss';

library.add(fab, fas, far);

initSentry();
registerServiceWorker().then(
  registration => registration && console.log('service worker registered.')
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={darkTheme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
