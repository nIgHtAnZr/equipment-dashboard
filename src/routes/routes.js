import React from 'react';
import { Router as ReactRouter, Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import PageNotFound from '../components/errorPages/PageNotFound';
import InternalServerError from '../components/errorPages/InternalServerError';
import Unathourized from '../components/errorPages/Unathourized';
import ChartView from '../containers/dashboard/ChartView';
import { deps } from '../redux/store';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Routes = () => {
  const { history } = deps;

  return (
    <ReactRouter history={history}>
      <ConnectedRouter history={history}>
        <Header history={history}/>
        <Switch>
          <Route exact path="/" component={ChartView} />
          <Route
            exact
            path="/internal-server-error"
            history={history}
            component={InternalServerError}
          />
          <Route
            exact
            path="/unathourized"
            history={history}
            component={Unathourized}
          />
          <Route
            history={history}
            component={PageNotFound}
          />
        </Switch>
        <Footer/>
      </ConnectedRouter>
    </ReactRouter>
  );
};

export default Routes;
