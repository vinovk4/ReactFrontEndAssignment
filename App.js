import React from 'react';
import Routes from './Routes';
import { withRouter } from 'react-router-dom';

const App = () => {
	return (
      <Routes />
	);
};

export default withRouter(App);