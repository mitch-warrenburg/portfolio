import React from 'react';
import styled from 'styled-components';
import { RoundImageProps } from './types';

const RoundImage = styled.img<RoundImageProps>`
  width: 40px;
  max-width: 100%;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.colors.font.primary};
  border-radius: 50%;
  object-fit: cover;
`;

export default RoundImage;
