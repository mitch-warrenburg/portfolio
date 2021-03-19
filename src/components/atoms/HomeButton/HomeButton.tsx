import React, { FC } from 'react';
import Icon from '../Icon';
import styled from 'styled-components';
import { HomeButtonProps } from './types';

const Button = styled.button<HomeButtonProps>`
  border-radius: 50%;
  pointer-events: all;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 46px;
  height: 46px;
  padding: 0;
  justify-content: center;
  transition: 250ms ease-in-out;
  color: ${({ theme, color }) => color || theme.colors.font.inactive};
  background: ${({ theme, color }) => theme.colors.background.secondary};

  &:hover {
    transform: scale(1.1, 1.1);
    color: ${({ theme }) => theme.colors.font.primary};
  }
`;

const HomeButton: FC<HomeButtonProps> = props => {
  return (
    <Button type="button" {...props}>
      <Icon icon="home" size="2x" />
    </Button>
  );
};

export default HomeButton;
