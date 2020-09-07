import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import dashboard from './dashboardReducer';

const rootReducer = history => {
  return combineReducers({
    router: connectRouter(history),
    dashboard,
  });
}

export default rootReducer;
