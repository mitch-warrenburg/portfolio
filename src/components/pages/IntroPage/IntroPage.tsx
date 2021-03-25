import React, { FC, useEffect } from 'react';
import { identity } from 'lodash';
import { useTimeout } from 'react-use';
import Optional from '../../atoms/Optional';
import { useHistory } from 'react-router-dom';
import { UiState, State } from '../../../store/types';
import { useSelector, useDispatch } from 'react-redux';
import { setHasRunIntro } from '../../../store/state/uiSlice';
import HyperSpeedAnimation from '../../molecules/HyperSpeedAnimation';
import IntroScreenAnimation from '../../molecules/IntroScreenAnimation';
import { introAnimationDurationMs, introToHomePageDelayMs } from './constants';

const IntroPage: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isComplete] = useTimeout(introAnimationDurationMs);
  const { hasRunIntro } = useSelector<State, UiState>(({ ui }) => ui);

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
    hasRunIntro && history.push('/app');
  }, [hasRunIntro]);

  return (
    <Optional renderIf={!hasRunIntro}>
      <Optional renderIf={!isAnimationComplete}>
        <IntroScreenAnimation />
      </Optional>
      <Optional renderIf={isAnimationComplete}>
        <HyperSpeedAnimation />
      </Optional>
    </Optional>
  );
};

export default IntroPage;
