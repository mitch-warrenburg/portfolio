import React from 'react';
import chroma from 'chroma-js';
import styled from 'styled-components';
import { LegendIconProps } from './types';

const LegendIcon = styled.div<LegendIconProps>`
  width: 18px;
  height: 18px;
  border: solid 1px ${({ color }) => color};
  margin-right: 8px;
  background: ${({ color }) => chroma(color).alpha(0.3).css()};
  border-radius: 2px;
`;

export default LegendIcon;
