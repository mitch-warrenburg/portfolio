import React, { FC } from 'react';
import Particles from 'react-tsparticles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/types';
import { CSSTransition } from 'react-transition-group';
import { spaceBackdropParticlesOptions, backdropFadeOutDurationMs } from './constants';
import './styles.scss';

const SpaceBackdrop: FC = () => {
  const hasRunIntro = useSelector<RootState, boolean>(({ ui }) => ui.hasRunIntro);

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={!hasRunIntro}
      classNames="space-backdrop"
      timeout={backdropFadeOutDurationMs}
      onEnter={() => console.log('entered')}
      onExit={() => console.log('exited')}>
      <div className="space-backdrop">
        <Particles
          id="space"
          options={spaceBackdropParticlesOptions}
          className="space-backdrop__stars"
        />
      </div>
    </CSSTransition>
  );
};

SpaceBackdrop.defaultProps = {
  isVisible: false,
};

export default SpaceBackdrop;
