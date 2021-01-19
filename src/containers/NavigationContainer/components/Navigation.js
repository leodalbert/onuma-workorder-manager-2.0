import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from 'components/Routes/PrivateRoute';

import TechDash from 'containers/TechDashContainer';
import RequesterDash from 'containers/RequesterDashContainer';
import WorkOrder from 'containers/WorkOrderContainer';
import WorkorderViewOnly from 'containers/WorkorderViewOnlyContainer';
import StatusPage from 'containers/StatusPageContainer';
import Header from 'containers/HeaderContainer';
import LogoutPage from 'components/Common/LogoutPage';

const Navigation = () => {
  return (
    <Fragment>
      <section>
        <Header />
        <Switch>
          <PrivateRoute
            exact
            path={`${process.env.PUBLIC_URL}/:studioId/technicians/:techEmail`}
            component={TechDash}
          />
          <PrivateRoute
            exact
            path={`${process.env.PUBLIC_URL}/:studioId/requester/:requesterEmail`}
            component={RequesterDash}
          />
          <PrivateRoute
            exact
            path={`${process.env.PUBLIC_URL}/:studioId/technicians/workorder/:id/:techEmail/:token?`}
            component={WorkOrder}
          />
          <PrivateRoute
            exact
            path={`${process.env.PUBLIC_URL}/:studioId/cc/workorder/:id/:ccEmail/:token?`}
            component={WorkorderViewOnly}
          />
          <PrivateRoute
            exact
            path={`${process.env.PUBLIC_URL}/:studioId/requester/workorder/:id/:requesterEmail/:token?`}
            component={StatusPage}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/:studioId/logout`}
            component={LogoutPage}
          />
        </Switch>
      </section>
    </Fragment>
  );
};

export default Navigation;
