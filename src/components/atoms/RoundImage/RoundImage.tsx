import React from 'react';
import styled from 'styled-components';
import { RoundImageProps } from './types';

const RoundImage = styled.img<RoundImageProps>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  max-width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.font.primary};
`;

export default RoundImage;
