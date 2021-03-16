import React from 'react';
import styled from 'styled-components';
import { FloatingButtonProps } from './types';

const FloatingButton = styled.button<FloatingButtonProps>`
  position: fixed;
  top: 32px;
  right: 32px;
  width: 36px;
  height: 36px;
  pointer-events: all;
  background-color: ${({ theme }) => theme.colors.background.dropdown};
  box-shadow: -1px 3px 8px -1px rgba(0, 0, 0, 0.2);
  padding: 8px;
  border-radius: 50%;
  z-index: 3;
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

export default FloatingButton;
