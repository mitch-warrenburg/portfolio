import React, { FC } from 'react';
import styled from 'styled-components';
import { ThemeToggleButtonProps } from './types';

const Button = styled.button<ThemeToggleButtonProps>`
  position: fixed;
  bottom: 50px;
  right: 30px;
  background-color: ${({ theme }) => theme.colors.background.dropdown};
  box-shadow: -1px 3px 8px -1px rgba(0, 0, 0, 0.2);
  padding: 8px;
  border-radius: 50%;
  z-index: 3;
  cursor: pointer;
  outline: none;
  border: none;

  svg {
    width: 24px;
    flex-shrink: 0;
    fill: #ffce45;
    stroke: #ffce45;
    transition: 0.5s;
  }
`;

const ThemeToggleButton: FC<ThemeToggleButtonProps> = props => {
  return (
    <Button {...props}>
      <svg
        viewBox="0 0 24 24"
        stroke="red"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    </Button>
  );
};

export default ThemeToggleButton;
