import React from 'react';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor} from './app/store';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import ThemeProvider from './theme';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
