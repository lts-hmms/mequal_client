import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { MainView } from './components/main-view/main-view';
import { store } from './store';

const container = document.getElementById('app-container');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <MainView />
  </Provider>
);
