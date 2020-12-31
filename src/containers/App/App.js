import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navigation from 'containers/NavigationContainer';

//  Material Ui
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './meta/theme';
import './meta/App.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navigation />
      </Router>
    </ThemeProvider>
  );
};

export default App;
