import React from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(app);
