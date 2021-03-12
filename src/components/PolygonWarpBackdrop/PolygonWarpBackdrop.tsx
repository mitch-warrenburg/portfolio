import React, { FC } from 'react';
import Particles from 'react-tsparticles';
import { polygonWarpBackdropParticlesOptions } from './constants';
import './styles.scss';

const PolygonWarpBackdrop: FC = () => {
  return (
    <div className="polygon-warp-backdrop">
      <Particles
        id="polygon-warp"
        className="polygon-warp-backdrop__polygons"
        options={polygonWarpBackdropParticlesOptions}
      />
    </div>
  );
};

export default PolygonWarpBackdrop;
