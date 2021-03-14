import React from 'react';
import { PanelProps } from './types';
import styled from 'styled-components';

const Panel = styled.div<PanelProps>`
  max-width: 1280px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  border-radius: 14px;
  font-size: 15px;
  background: ${({ theme }) => theme.colors.background.panel};
`;

export default Panel;
