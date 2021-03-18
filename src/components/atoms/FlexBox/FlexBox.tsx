import React from 'react';
import { FlexBoxProps } from './types';
import styled from 'styled-components';

const FlexBox = styled.div<FlexBoxProps>`
  pointer-events: initial;
  display: flex;
  width: 100%;
  flex-wrap: ${({ wrap }) => wrap};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  flex-direction: ${({ direction }) => direction};
`;

FlexBox.defaultProps = {
  margin: '0',
  padding: '0',
  wrap: 'initial',
  align: 'center',
  justify: 'center',
  direction: 'row',
};

export default FlexBox;
