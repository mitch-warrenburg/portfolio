import React from 'react';
import { PanelProps } from './types';
import styled from 'styled-components';

const Panel = styled.div<PanelProps>`
  display: flex;
  overflow: hidden;
  width: 100%;
  max-width: 1280px;
  height: 90vh;
  flex-direction: column;
  margin-top: 32px;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 14px;
`;

export default Panel;
