import React from 'react';
import { FlexBoxProps } from './types';
import styled from 'styled-components';

const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  align-items: ${({align}) => align};
  justify-content: ${({justify}) => justify};
  flex-direction: ${({direction}) => direction};
`;

FlexBox.defaultProps = {
  align: 'center',
  justify: 'center',
  direction: 'row',
};

export default FlexBox;
