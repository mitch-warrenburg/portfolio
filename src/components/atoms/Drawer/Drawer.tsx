import React, { FC } from 'react';
import styled from 'styled-components';
import { DrawerProps } from './types';

const Drawer = styled.div<DrawerProps>`
  position: absolute;
  z-index: 5;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  overflow: hidden;
  width: 100vw;
  max-width: ${({ open }) => (open ? '100%' : 0)};
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  background: ${({ theme }) => theme.colors.background.modal};
  transition: ease-in-out 200ms;
`;

export default Drawer;
