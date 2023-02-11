import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// import moviesApp from './reducers/reducers';
import { MainView } from './components/main-view/main-view';
import { store } from './store';
import './index.scss';

// const mequalStore = createStore(moviesApp, devToolsEnhancer());

const container = document.getElementById('app-container');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <MainView />
  </Provider>
);
