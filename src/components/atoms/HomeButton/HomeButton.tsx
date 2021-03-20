import React, { FC } from 'react';
import Icon from '../Icon';
import styled from 'styled-components';
import { HomeButtonProps } from './types';

const Button = styled.button<HomeButtonProps>`
  display: flex;
  width: 46px;
  height: 46px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: ${({ theme, color }) => theme.colors.background.secondary};
  border-radius: 50%;
  color: ${({ theme, color }) => color || theme.colors.font.inactive};
  cursor: pointer;
  outline: none;
  pointer-events: all;
  transition: 250ms ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.font.primary};
    transform: scale(1.1, 1.1);
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
