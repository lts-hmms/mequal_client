import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';

import MainView from './components/main-view/main-view';

// Import statement to indicate that I need to bundle. `./index.scss`
import './index.scss';

const mequalStore = createStore(moviesApp, devToolsEnhancer());

// Main component (will eventually use all the others)
class mequalApplication extends React.Component {
  render() {
    return (
      // inside provider pass every comp that needs access to store
      <Provider store={mequalStore}>
        <div>
          <MainView />
        </div>
      </Provider>
    );
  }
}

// Finds the root of my app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render my app in the root DOM element
ReactDom.render(React.createElement(mequalApplication), container);
