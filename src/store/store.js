import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import reducers from './reducers/';

const store = createStore(reducers, applyMiddleware(thunk,promise));

export default store;