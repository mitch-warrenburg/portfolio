import React, { FC } from 'react';
import { SectionProps } from './types';
import styled from 'styled-components';
import Optional from '../../atoms/Optional';
import SectionHeader from '../../atoms/SectionHeader';

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0;
  margin-top: 56px;

  :first-of-type {
    margin-top: 16px;
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
