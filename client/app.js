import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import FontFaceObserver from 'fontfaceobserver';

import history from './utils/history';

import configureStore from './configureStore';

// Root app
import App from './containers/App';

const robotoObserver = new FontFaceObserver('Roboto', {});
robotoObserver.load().then(() => {
    document.body.classList.add('fontLoaded');
});

// The initial state of the App
const INITIAL_STATE = {
    global: {
        isLoading: false,
        notes: []
    }
};

const store = configureStore(history);
const MOUNT_NODE = document.getElementById('app');

const render = notes => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>,
        MOUNT_NODE
    );
};

if (module.hot) {
    module.hot.accept(['./containers/App'], () => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render([]);
    })
}

// Render DOM
render([]);