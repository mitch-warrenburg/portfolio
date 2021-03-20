import React, { FC } from 'react';
import styled from 'styled-components';
import Particles from 'react-tsparticles';
import { polygonWarpBackdropParticlesOptions } from './constants';
import './styles.scss';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: all;
`;

const PolygonWarpBackdrop: FC = () => {
  return (
    <Container>
      <Particles
        id="polygon-warp"
        className="polygon-warp-particles"
        options={polygonWarpBackdropParticlesOptions}
      />
    </Container>
  );
};

export default PolygonWarpBackdrop;
