import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/types';
import { CSSTransition } from 'react-transition-group';
import { backdropFadeOutDurationMs } from './constants';
import './styles.scss';

const SpaceBackdrop: FC = () => {
  const hasRunIntro = useSelector<RootState, boolean>(({ ui }) => ui.hasRunIntro);

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={!hasRunIntro}
      classNames="space-backdrop"
      timeout={backdropFadeOutDurationMs}>
      <div className="space-backdrop">
        <div className="space-backdrop__stars-1" />
        <div className="space-backdrop__stars-2" />
        <div className="space-backdrop__stars-3" />
      </div>
    </CSSTransition>
  );
};

SpaceBackdrop.defaultProps = {
  isVisible: false,
};

export default SpaceBackdrop;
