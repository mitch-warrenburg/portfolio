import React from 'react';
import styled from 'styled-components';
import { SectionHeaderProps } from './types';

const SectionHeader = styled.h3<SectionHeaderProps>`
  margin-bottom: 18px;
  color: white;
`;

export default SectionHeader;
