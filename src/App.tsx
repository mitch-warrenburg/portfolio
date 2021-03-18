import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import IntroPage from './components/pages/IntroPage';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import HomePage from './components/pages/HomePage/HomePage';
import AdminLoginPage from './components/pages/AdminLoginPage';
import SpaceBackdrop from './components/molecules/SpaceBackdrop';
import './_index.scss';

library.add(fab, fas, far);

const App: FC = () => {
  return (
    <>
      <SpaceBackdrop />
      <div className="app-root">
        <Switch>
          <Route exact path="/" component={IntroPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/admin/login" component={AdminLoginPage} />
        </Switch>
      </div>
    </>
  );
};

export default App;
