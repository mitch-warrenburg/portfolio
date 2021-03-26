import React from 'react';
import { ButtonProps } from './types';
import styled from 'styled-components';

const Button = styled.button<ButtonProps>`
  display: flex;
  overflow: hidden;
  min-width: 100px;
  max-width: 140px;
  min-height: 30px;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  border: ${({ theme, transparent }) =>
    transparent ? `1px solid ${theme.colors.font.transparentButton}` : 'none'};
  background: ${({ theme, transparent }) =>
    transparent ? 'transparent' : theme.colors.theme.primary};
  border-radius: 20px;
  color: papayawhip;
  cursor: pointer;
  font-size: 0.875rem;
  outline: none;
  pointer-events: initial;
  transition: 300ms;
  white-space: nowrap;

  &:hover:not(:disabled),
  &:active,
  &:focus {
    border-color: white;
    color: white;
  }

  &:disabled {
    border-color: ${({ theme }) => theme.colors.font.inactive};
    color: ${({ theme }) => theme.colors.font.inactive};
    cursor: initial;
  }
`;

export default Button;
