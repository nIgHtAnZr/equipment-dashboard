import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
// import reduxLogger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const deps = {
  history: createBrowserHistory(),
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['dashboard'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer(deps.history));

let middleware = [routerMiddleware(deps.history), reduxThunk];

// Uncomment this and the import statement to see the redux state loggers in console.
// if (process.env.NODE_ENV !== 'production') {
//   middleware = [...middleware, reduxLogger];
// }

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { persistor, store };
