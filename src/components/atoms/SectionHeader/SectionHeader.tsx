import React from 'react';
import styled from 'styled-components';
import { SectionHeaderProps } from './types';

const SectionHeader = styled.h6<SectionHeaderProps>`
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.font.header};
`;

export default SectionHeader;
