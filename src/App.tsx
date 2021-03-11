import React, { FC } from 'react';
import IntroScreen from './components/IntroScreen';
import './index.scss';

const App: FC = () => {
  return (
    <div className="application-root">
      <IntroScreen />
    </div>
  );
};

export default App;
