import React from 'react';
import { createRoot } from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';
import MainView from './components/main-view/main-view';
import './index.scss';

const mequalStore = createStore(moviesApp, devToolsEnhancer());

const MequalApplication = () => (
  <Provider store={mequalStore}>
    <div>
      <MainView />
    </div>
  </Provider>
);

const container = document.getElementById('app-container');
const root = createRoot(container);
root.render(<MequalApplication />);
