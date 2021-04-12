import React, { FC } from 'react';
import { LegendItemProps } from './types';
import styled from 'styled-components';
import LegendIcon from '../../atoms/LegendIcon';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  font-style: italic;
  text-align: left;
`;

const LegendItem: FC<LegendItemProps> = ({ color, text, ...props }) => {
  return (
    <Container {...props}>
      <LegendIcon color={color} />
      <span>{text}</span>
    </Container>
  );
};

export default LegendItem;
