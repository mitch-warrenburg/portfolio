import React from 'react';
import { ButtonProps } from './types';
import styled from 'styled-components';

const Button = styled.button<ButtonProps>`
  pointer-events: initial;
  cursor: pointer;
  outline: none;
  padding: 6px 24px;
  font-size: 0.875rem;
  border-radius: 20px;
  transition: 300ms;
  white-space: nowrap;
  border: ${({ theme, transparent }) =>
    transparent ? `1px solid ${theme.colors.font.transparentButton}` : 'none'};
  color: ${({ theme, transparent }) =>
    transparent ? theme.colors.font.transparentButton : theme.colors.font.primary};
  background: ${({ theme, transparent }) =>
    transparent ? 'transparent' : theme.colors.theme.primary};

  &:hover,
  &:active,
  &:focus {
    color: white;
    border-color: white;
  }
`;

export default Button;
