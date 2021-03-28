import React from 'react';
import styled from 'styled-components';
import { RoundImageProps } from './types';

const RoundImage = styled.img<RoundImageProps>`
  max-width: 36px;
  height: 100%;
  max-height: 36px;
  border: 2px solid ${({ theme }) => theme.colors.font.primary};
  border-radius: 50%;
  object-fit: cover;
`;

export default RoundImage;
