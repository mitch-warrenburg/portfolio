import React, { FC, useState, useLayoutEffect } from 'react';
import Optional from '../Optional';
import { LoaderProps } from './types';
import { ripple } from '../../animations';
import styled, { css } from 'styled-components';

const animation = ({ size = 1, durationSeconds = 1 }: LoaderProps) => css<LoaderProps>`
  ${ripple(size)} ${durationSeconds}s cubic-bezier(0, 0.2, 0.8, 1);
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
    opacity: 0;
    transform: ${transform};

    &:nth-child(2) {
      animation-delay: -500ms;
    }
  }
`;

const Loader: FC<LoaderProps> = ({ durationSeconds = 1, ...props }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useLayoutEffect(() => {
    setIsAnimating(true);

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, durationSeconds * 1000 + 300);

    return () => clearTimeout(timer);
  }, [isAnimating]);

  return (
    <Optional renderIf={isAnimating}>
      <Container {...props} durationSeconds={durationSeconds}>
        <div />
        <div />
      </Container>
    </Optional>
  );
};

Loader.defaultProps = {
  size: 1,
  durationSeconds: 1,
};

export default Loader;
