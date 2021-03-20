import React, { FC } from 'react';
import { LoaderProps } from './types';
import styled, { css } from 'styled-components';
import { ripple } from '../../animations';

const animation = ({ size = 1, durationSeconds = 1 }: LoaderProps) => css<LoaderProps>`
  ${ripple(size)} ${durationSeconds}s cubic-bezier(0, 0.2, 0.8, 1) infinite
`;

const transform = ({ size = 1 }: LoaderProps) => css<LoaderProps>`
  translate(${-16 * Math.abs(size)}px, ${-16 * Math.abs(size)}px)
`;

const Container = styled.div<LoaderProps>`
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  justify-content: flex-start;

  & div {
    position: absolute;
    border: 1px solid rgba(255, 255, 255, 0.3);
    animation: ${animation};
    background: ${({ color }) => color || 'rgb(57,109,240, 0.3)'};
    border-radius: 50%;
    opacity: 1;
    transform: ${transform};

    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }
`;

const Loader: FC<LoaderProps> = props => {
  return (
    <Container {...props}>
      <div />
      <div />
    </Container>
  );
};

Loader.defaultProps = {
  size: 1,
};

export default Loader;