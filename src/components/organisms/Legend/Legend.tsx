import React, { FC } from 'react';
import styled from 'styled-components';
import { LegendProps } from './types';
import LegendItem from '../../molecules/LegendItem';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  div {
    margin-left: 8px;
  }
`;

const Legend: FC<LegendProps> = ({ items, ...props }) => {
  return (
    <Container {...props}>
      {items.map(({ color, text }) => (
        <LegendItem key={text} color={color} text={text} />
      ))}
    </Container>
  );
};

export default Legend;
