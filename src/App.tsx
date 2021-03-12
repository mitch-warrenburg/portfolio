import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { UiState, RootState } from "./store/types";
import IntroScreen from './components/IntroScreen';
import SpaceBackdrop from './components/SpaceBackdrop';
import HomeScreen from './components/HomeScreen/HomeScreen';
import { Route, Switch, useHistory } from "react-router-dom";
import './index.scss';

const App: FC = () => {

  const history = useHistory();
  const { hasRunIntro } = useSelector<RootState, UiState>(({ ui }) => ui);

  useEffect(() => {
    if(!hasRunIntro) {
      history.push('/');
    }
  }, [hasRunIntro])

  return (
    <>
      <SpaceBackdrop />
      <div className="app-root">
        <Switch>
          <Route exact path="/" component={IntroScreen} />
          <Route path="/home" component={HomeScreen} />
        </Switch>
      </div>
    </>
  );
};

export default App;
