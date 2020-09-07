import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './routes/routes';
import { store, persistor } from './redux/store';
import LoadingSpinner from './components/Loader/LoadingSpinner';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner/>} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
