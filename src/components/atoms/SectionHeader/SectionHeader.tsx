import React from 'react';
import styled from 'styled-components';
import { SectionHeaderProps } from './types';

const SectionHeader = styled.h3<SectionHeaderProps>`
  margin-bottom: 18px;
  color: ${({ theme }) => theme.colors.font.header};
`;

export default SectionHeader;
