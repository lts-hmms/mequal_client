import React from 'react';
import { Container } from 'react-bootstrap';
import ReactDom from 'react-dom';
import MainView from './components/main-view/main-view';

// Import statement to indicate that I need to bundle. `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class mequalApplication extends React.Component {
        render() {
                return (
                        <div>
                                <MainView />
                        </div>
                );
        }
}

// Finds the root of my app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render my app in the root DOM element
ReactDom.render(React.createElement(mequalApplication), container);
