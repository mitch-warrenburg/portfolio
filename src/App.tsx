import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UiState, RootState } from './store/types';
import IntroPage from './components/pages/IntroPage';
import SpaceBackdrop from './components/molecules/SpaceBackdrop';
import HomePage from './components/pages/HomePage/HomePage';
import { Route, Switch, useHistory } from 'react-router-dom';
import './index.scss';

const App: FC = () => {
  const history = useHistory();
  const { hasRunIntro } = useSelector<RootState, UiState>(({ ui }) => ui);

  useEffect(() => {
    if (!hasRunIntro) {
      history.push('/');
    }
  }, [hasRunIntro]);

  return (
    <>
      <SpaceBackdrop />
      <div className="app-root">
        <Switch>
          <Route exact path="/" component={IntroPage} />
          <Route path="/home" component={HomePage} />
        </Switch>
      </div>
    </>
  );
};

export default App;
