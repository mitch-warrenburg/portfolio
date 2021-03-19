import React, { FC } from 'react';
import styled from 'styled-components';
import Particles from 'react-tsparticles';
import { polygonWarpBackdropParticlesOptions } from './constants';
import './styles.scss';

const Container = styled.div`
  pointer-events: all;
  height: 100vh;
  width: 100vw;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
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
