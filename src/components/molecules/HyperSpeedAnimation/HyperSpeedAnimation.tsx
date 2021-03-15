import { range } from 'lodash';
import React, { FC } from 'react';
import { hyperSpeedParticleCount } from './constants';
import './styles.scss';

// TODO: use styled components

const HyperSpeedAnimation: FC = () => {
  return (
    <div className="hyperspeed-animation">
      <div className="hyperspeed-animation__particles">
        {range(hyperSpeedParticleCount).map(index => (
          <div
            key={`hyperspeed-particle-${index}`}
            className="hyperspeed-animation__particle"
          />
        ))}
      </div>
    </div>
  );
};

export default HyperSpeedAnimation;
