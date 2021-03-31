import React, { FC, useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
import styled from 'styled-components';
import Particles from 'react-tsparticles';
import { useWindowSize } from 'react-use';
import { polygonWarpBackdropParticlesOptions } from './constants';
import './styles.scss';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  pointer-events: all;
`;

const generateId = () => uniqueId('polygon-warp-backdrop');

const PolygonWarpBackdrop: FC = () => {
  const [key, setKey] = useState(() => generateId());

  const { height, width } = useWindowSize();

  useEffect(() => {
    setKey(generateId());
  }, [height, width]);

  return (
    <Container>
      <Particles
        key={key}
        id="polygon-warp"
        className="polygon-warp-particles"
        options={polygonWarpBackdropParticlesOptions}
      />
    </Container>
  );
};

export default PolygonWarpBackdrop;
