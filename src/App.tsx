import React, { FC, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import IntroPage from './components/pages/IntroPage';
import AdminPage from './components/pages/AdminPage';
import AdminRoute from './components/molecules/Route';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { Route, Redirect, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import SpaceBackdrop from './components/molecules/SpaceBackdrop';
import RootErrorBoundary from './components/atoms/RootErrorBoundary';
import ApplicationShell from './components/organisms/ApplicationShell';
import SuspensePlaceholder from './components/organisms/SuspensePlaceholder';
import './_index.scss';

const AdminLoginPage = lazy(() => import('./components/pages/AdminLoginPage'));
const ToastNotifications = lazy(() => import('./components/organisms/ToastNotifications'));
const ChatMessengerWidget = lazy(() => import('./components/organisms/ChatMessengerWidget'));

library.add(fab, fas, far);

const App: FC = () => {
  const dispatch = useDispatch();

  return (
    <RootErrorBoundary dispatch={dispatch}>
      <SpaceBackdrop />
      <Suspense fallback={null}>
        <ToastNotifications />
      </Suspense>
      <Suspense fallback={null}>
        <ChatMessengerWidget />
      </Suspense>
      <Switch>
        <Route exact path="/" component={IntroPage} />
        <Route path="/app" component={ApplicationShell} />
        <AdminRoute exact admin path="/admin" component={AdminPage} />
        <Route path="/admin/login">
          <Suspense fallback={<SuspensePlaceholder />}>
            <AdminLoginPage />
          </Suspense>
        </Route>
        <Redirect to="/app" />
      </Switch>
    </RootErrorBoundary>
  );
};

export default App;
