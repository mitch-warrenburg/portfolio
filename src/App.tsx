import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import IntroScreen from './components/IntroScreen';
import HomeScreen from './components/HomeScreen/HomeScreen';
import './index.scss';

const App: FC = () => {

  return (
    <div className="application-root">
      <Switch>
        <Route path="/" component={IntroScreen} />
        <Route path="/home" component={HomeScreen} />
      </Switch>
    </div>
  );
};

export default App;
