import React from 'react';
import { OverlayProps } from './types';
import styled from 'styled-components';

const Overlay = styled.div<OverlayProps>`
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.background.overlay};
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: 0.3s;
  visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
`;

Overlay.defaultProps = {
  active: false,
};

export default Overlay;
