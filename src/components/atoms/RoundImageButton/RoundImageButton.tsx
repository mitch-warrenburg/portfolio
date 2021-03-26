import React, { FC } from 'react';
import styled from 'styled-components';
import RoundImage from '../RoundImage';
import { RoundImageButtonProps } from './types';

const Button = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
`;

const RoundImageButton: FC<RoundImageButtonProps> = ({ src, alt, ...props }) => {
  return (
    <Button {...props}>
      <RoundImage src={src} alt={alt} />
    </Button>
  );
};

export default RoundImageButton;
