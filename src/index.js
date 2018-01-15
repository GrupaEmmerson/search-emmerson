import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch} from 'react-router-dom';
import { createBrowserHistory as historyBrowser} from 'history';

import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

// Styles
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import '../scss/style.scss';

// Containers
import Full from './containers/Full/';
import reducers from './reducers';
import {GET_LOCATION} from "./actions/types";
import NoSidebar from "./containers/NoSidebar/";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
store.dispatch({type: GET_LOCATION});
const history = historyBrowser();

ReactDOM.render((
    <Provider store={store}>
        <HashRouter history={history}>
            <Switch>
                <Route path="/offer/:id" name="Offer Page" component={NoSidebar}/>
                <Route path="/" name="Main Page" component={Full}/>
            </Switch>
        </HashRouter>
    </Provider>
), document.getElementById('root'));