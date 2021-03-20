import React from 'react';
import { FlexBoxProps } from './types';
import styled from 'styled-components';

const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  width: 100%;
  flex-direction: ${({ direction }) => direction};
  flex-wrap: ${({ wrap }) => wrap};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  pointer-events: initial;
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
