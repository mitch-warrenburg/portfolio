import React, { FC } from 'react';
import Route from './components/molecules/Route';
import { Redirect, Switch } from 'react-router-dom';
import AdminPage from './components/pages/AdminPage';
import IntroPage from './components/pages/IntroPage';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import HomePage from './components/pages/HomePage/HomePage';
import AdminLoginPage from './components/pages/AdminLoginPage';
import SpaceBackdrop from './components/molecules/SpaceBackdrop';
import ToastNotifications from './components/organisms/ToastNotifications';
import PolygonWarpBackdrop from './components/molecules/PolygonWarpBackdrop';
import ChatMessengerWidget from './components/organisms/ChatMessenger/ChatMessengerWidget';
import './_index.scss';

library.add(fab, fas, far);

const App: FC = () => {
  return (
    <>
      <SpaceBackdrop />
      <PolygonWarpBackdrop />
      <ChatMessengerWidget />
      <ToastNotifications />
      <Switch>
        <Route exact path="/" component={IntroPage} />
        <Route path="/app" component={HomePage} />
        <Route exact admin path="/admin" component={AdminPage} />
        <Route path="/admin/login" component={AdminLoginPage} />
        <Redirect to="/app" />
      </Switch>
    </>
  );
};

export default App;
