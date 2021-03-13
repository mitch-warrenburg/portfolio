import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { darkTheme } from './styles/theme';
import store, { persistor } from './store';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import './index.scss';

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
