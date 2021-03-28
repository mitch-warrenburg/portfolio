import React, { FC } from 'react';
import Icon from '../Icon';
import styled from 'styled-components';
import { IconButtonProps } from './types';

const Button = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  outline: none;

  &:hover {
    transform: scale(1.08, 1.08);
    transition: ease-in-out 200ms;
  }
`;

const IconButton: FC<IconButtonProps> = ({ onClick, ...props }) => {
  return (
    <Button onClick={onClick}>
      <Icon {...props} />
    </Button>
  );
};

export default IconButton;
