import React from 'react';
import styled from 'styled-components';
import { FloatingButtonProps } from './types';

const FloatingButton = styled.button<FloatingButtonProps>`
  position: fixed;
  z-index: 3;
  top: 32px;
  right: 32px;
  width: 36px;
  height: 36px;
  padding: 8px;
  border: none;
  background-color: ${({ theme }) => theme.colors.background.dropdown};
  border-radius: 50%;
  box-shadow: -1px 3px 8px -1px rgba(0, 0, 0, 0.2);
  outline: none;
  pointer-events: all;

  svg {
    width: 24px;
    flex-shrink: 0;
    fill: #ffce45;
    stroke: #ffce45;
    transition: 0.5s;
  }
`;

export default FloatingButton;
