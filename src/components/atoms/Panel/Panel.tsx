import React from 'react';
import { PanelProps } from './types';
import styled from 'styled-components';

const Panel = styled.div<PanelProps>`
  display: flex;
  overflow: hidden;
  width: 100%;
  max-width: 1280px;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 14px;

  @media screen and (max-width: 720px) {
    height: 100%;
    margin-top: 0;
    border-radius: 0;
  }
`;

export default Panel;
