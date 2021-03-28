import React, { FC } from 'react';
import { SectionProps } from './types';
import styled from 'styled-components';
import Optional from '../../atoms/Optional';
import SectionHeader from '../../atoms/SectionHeader';

const SectionContainer = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 0;
  margin-top: 50px;

  &:last-child {
    margin-bottom: 36px;
  }
`;

const Section: FC<SectionProps> = ({ children, header, ...props }) => {
  return (
    <SectionContainer {...props}>
      <Optional renderIf={header}>
        <SectionHeader>{header}</SectionHeader>
      </Optional>
      {children}
    </SectionContainer>
  );
};

export default Section;
