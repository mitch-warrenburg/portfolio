import React, { FC } from 'react';
import Optional from '../Optional';
import { useTimeout } from 'react-use';
import { introAnimationDurationMs } from './constants';
import HyperSpeedAnimation from '../HyperSpeedAnimation';
import IntroScreenAnimation from '../IntroScreenAnimation';
import './styles.scss';

const IntroScreen: FC = () => {
  const isAnimationComplete = useTimeout(introAnimationDurationMs);

  return (
    <div className="intro-screen">
      <Optional renderIf={!isAnimationComplete}>
        <IntroScreenAnimation />
      </Optional>
      <Optional renderIf={isAnimationComplete}>
        <HyperSpeedAnimation />
      </Optional>
    </div>
  );
};

export default IntroScreen;
