import React, { FC, useEffect } from 'react';
import { identity } from 'lodash';
import Optional from '../Optional';
import { useTimeout } from 'react-use';
import { useHistory } from 'react-router-dom';
import { RootState, UiState } from '../../store/types';
import { useSelector, useDispatch } from 'react-redux';
import HyperSpeedAnimation from '../HyperSpeedAnimation';
import IntroScreenAnimation from '../IntroScreenAnimation';
import { setHasRunIntro } from '../../store/state/uiSlice';
import { introAnimationDurationMs, introToHomePageDelayMs } from './constants';
import './styles.scss';

const IntroScreen: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isComplete] = useTimeout(introAnimationDurationMs);
  const { hasRunIntro } = useSelector<RootState, UiState>(({ ui }) => ui);

  const isAnimationComplete = isComplete();

  useEffect(() => {
    if (isAnimationComplete) {
      const timer = setTimeout(() => {
        dispatch(setHasRunIntro(true));
      }, introToHomePageDelayMs);

      return () => clearTimeout(timer);
    }
    return identity;
  }, [isAnimationComplete]);

  useEffect(() => {
    hasRunIntro && history.push('/home');
  }, [hasRunIntro]);

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
