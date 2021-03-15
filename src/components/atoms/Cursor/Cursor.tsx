import React from 'react';
import { CursorProps } from './types';
import styled from 'styled-components';
import { blink } from '../../animations';

const Cursor = styled.span<CursorProps>`
  font-weight: bold;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-name: ${({ blinking }) => blink(blinking)};
  color: ${({ isNewLine, hidden }) =>
    hidden ? 'transparent' : isNewLine ? '#3a6df0' : 'inherit'};
`;

Cursor.defaultProps = {
  hidden: false,
  blinking: false,
  isNewLine: false,
}

export default Cursor;
