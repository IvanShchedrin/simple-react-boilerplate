import React from 'react'
import { render } from 'react-dom'
import Gallery from './gallery'

import { Router, Route, browserHistory } from 'react-router'

export default () => {
  return (
    <Router history={browserHistory}>
      <Route path='gallery' component={Gallery} />
    </Router>
  );
};
