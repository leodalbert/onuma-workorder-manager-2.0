import React, { Fragment } from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from 'components/Routes/PrivateRoute';

// import Spinner from 'components/Common/Spinner';
import TechDash from 'containers/TechDashContainer';
import WorkOrder from 'containers/WorkOrderContainer';
import Header from 'containers/HeaderContainer';

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
            path={`${process.env.PUBLIC_URL}/:studioId/technicians/workorder/:id/:techEmail/:token?`}
            component={WorkOrder}
          />
        </Switch>
      </section>
    </Fragment>
  );
};

export default Navigation;
