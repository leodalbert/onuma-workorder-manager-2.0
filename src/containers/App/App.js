import React from 'react';
import network from 'utils/network';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';

//  Material Ui
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './meta/theme';
import './meta/App.css';

import Navigation from 'containers/NavigationContainer';

// const t = async () => {
//   const res = await network.workOrderStatusChange(1005, 'Work In Progress', 26);
//   console.log(res);
// };
// network.deleteAttachment();
const App = (props) => {
  // t();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation />
      </Router>
    </ThemeProvider>
  );
};

App.propTypes = {};

export default App;
