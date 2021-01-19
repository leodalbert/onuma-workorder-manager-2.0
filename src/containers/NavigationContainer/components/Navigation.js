import React, { Fragment, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from 'components/Routes/PrivateRoute';

import Header from 'containers/HeaderContainer';
import LogoutPage from 'components/Common/LogoutPage';
import Spinner from 'components/Common/Spinner';

const TechDash = lazy(() => import('containers/TechDashContainer'));
const RequesterDash = lazy(() => import('containers/RequesterDashContainer'));
const WorkOrder = lazy(() => import('containers/WorkOrderContainer'));
const WorkorderViewOnly = lazy(() =>
  import('containers/WorkorderViewOnlyContainer')
);
const StatusPage = lazy(() => import('containers/StatusPageContainer'));

const Navigation = () => {
  return (
    <Fragment>
      <section>
        <Header />
        <Suspense fallback={<Spinner />}>
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
        </Suspense>
      </section>
    </Fragment>
  );
};

export default Navigation;
