import React from 'react';
import { OverlayProps } from './types';
import styled from 'styled-components';

const Overlay = styled.div<OverlayProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  transition: 0.3s;
  opacity: ${({ active }) => (active ? 1 : 0)};
  visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
  background: ${({ theme }) => theme.colors.background.overlay};
`;

Overlay.defaultProps = {
  active: false,
};

export default Overlay;
