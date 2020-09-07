import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './routes/routes';
import { store, persistor } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading...</div>} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
