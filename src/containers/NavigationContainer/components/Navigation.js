import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// import Spinner from 'components/Common/Spinner';
import TechDash from 'containers/TechDashContainer';
import Header from 'containers/HeaderContainer';

const Navigation = () => {
  return (
    <Fragment>
      <section>
        <Header />
        <Switch>
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/:studioId/technicians/:techEmail`}
            component={TechDash}
          />
        </Switch>
      </section>
    </Fragment>
  );
};

export default Navigation;
