import React, { FC } from 'react';
import Particles from 'react-tsparticles';
import { particlesOptions } from './constants';
import './styles.scss';

const SpaceBackdrop: FC = () => {
  return <Particles options={particlesOptions} className="space-backdrop__stars" />;
};

export default SpaceBackdrop;
