import React from 'react';
import { Route, Switch } from 'react-router-dom';

import StatusPageHeader from './StatusPageHeader';
import TechPageHeader from './TechPageHeader';
import CcPageHeader from './CcPageHeader';

const Header = ({ ...rest }) => {
  return (
    <Switch>
      <Route
        path={`${process.env.PUBLIC_URL}/:studioId/technicians`}
        render={(props) => <TechPageHeader {...props} {...rest} />}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/:studioId/requester`}
        render={(props) => <StatusPageHeader {...props} {...rest} />}
      />
      <Route
        path={`${process.env.PUBLIC_URL}/:studioId/cc`}
        render={(props) => <CcPageHeader {...props} {...rest} />}
      />
    </Switch>
  );
};

export default Header;
