import React from 'react';
import { Route, Switch } from 'react-router-dom';

import StatusPageHeader from './StatusPageHeader';
import TechPageHeader from './TechPageHeader';

const Header = ({ ...rest }) => {
  return (
    <Switch>
      <Route
        path={`${process.env.PUBLIC_URL}/:studioId/technicians`}
        render={(props) => <TechPageHeader {...props} {...rest} />}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/:studioId/requester`}
        component={StatusPageHeader}
      />
    </Switch>
  );
};

export default Header;
