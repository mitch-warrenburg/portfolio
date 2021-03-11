import React, { FC } from 'react';
import { range } from 'lodash';
import { hyperspeedParticleCount } from './constants';
import './styles.scss';

const HyperSpeedAnimation: FC = () => {
  return (
    <div className="hyperspeed-backdrop">
      <div className="hyperspeed-backdrop__particles">
        {range(hyperspeedParticleCount).map(index => (
          <div
            key={`hyperspeed-particle-${index}`}
            className="hyperspeed-backdrop__particle"
          />
        ))}
      </div>
    </div>
  );
};

export default HyperSpeedAnimation;
