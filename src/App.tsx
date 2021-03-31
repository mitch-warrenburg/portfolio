import React, { FC, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import AdminPage from './components/pages/AdminPage';
import AdminRoute from './components/molecules/Route';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { Route, Redirect, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import RootErrorBoundary from './components/atoms/RootErrorBoundary';
import SuspensePlaceholder from './components/organisms/SuspensePlaceholder';
import './_index.scss';

const IntroPage = lazy(() => import('./components/pages/IntroPage'));
const AdminLoginPage = lazy(() => import('./components/pages/AdminLoginPage'));
const SpaceBackdrop = lazy(() => import('./components/molecules/SpaceBackdrop'));
const ApplicationShell = lazy(() => import('./components/organisms/ApplicationShell'));
const ToastNotifications = lazy(() => import('./components/organisms/ToastNotifications'));
const PolygonWarpBackdrop = lazy(() => import('./components/molecules/PolygonWarpBackdrop'));
const ChatMessengerWidget = lazy(() => import('./components/organisms/ChatMessengerWidget'));

library.add(fab, fas, far);

const App: FC = () => {
  const dispatch = useDispatch();

  return (
    <RootErrorBoundary dispatch={dispatch}>
      <Suspense fallback={<SuspensePlaceholder />}>
        <SpaceBackdrop />
      </Suspense>
      <Suspense fallback={<SuspensePlaceholder />}>
        <PolygonWarpBackdrop />
      </Suspense>
      <Suspense fallback={<SuspensePlaceholder />}>
        <ToastNotifications />
      </Suspense>
      <Suspense fallback={<SuspensePlaceholder />}>
        <ChatMessengerWidget />
      </Suspense>
      <Switch>
        <Route exact path="/">
          <Suspense fallback={<SuspensePlaceholder />}>
            <IntroPage />
          </Suspense>
        </Route>
        <Route path="/app">
          <Suspense fallback={<SuspensePlaceholder />}>
            <ApplicationShell />
          </Suspense>
        </Route>
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
