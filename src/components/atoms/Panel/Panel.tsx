import React from 'react';
import { PanelProps } from './types';
import styled from 'styled-components';

const Panel = styled.div<PanelProps>`
  position: relative;
  display: flex;
  overflow: hidden;
  width: 100%;
  max-width: 1280px;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 14px;

  @media screen and (max-width: 720px), screen and (max-height: 600px) {
    max-width: 100vw;
    height: 100%;
    margin-top: 0;
    border-radius: 0;
  }
`;

export default Panel;
