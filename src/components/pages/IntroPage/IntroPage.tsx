import React, { FC, useEffect } from 'react';
import { identity } from 'lodash';
import { useTimeout } from 'react-use';
import Optional from '../../atoms/Optional';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, UiState } from '../../../store/types';
import { setHasRunIntro } from '../../../store/state/uiSlice';
import HyperSpeedAnimation from '../../molecules/HyperSpeedAnimation';
import IntroScreenAnimation from '../../molecules/IntroScreenAnimation';
import { introAnimationDurationMs, introToHomePageDelayMs } from './constants';

const IntroPage: FC = () => {
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

export default IntroPage;