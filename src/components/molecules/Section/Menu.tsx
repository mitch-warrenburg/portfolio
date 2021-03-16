import React, { FC } from 'react';
import { SectionProps } from './types';
import styled from 'styled-components';
import Optional from '../../atoms/Optional';
import SectionHeader from '../../atoms/SectionHeader';

const SectionContainer = styled.section`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;

const Menu: FC<SectionProps> = ({ children, header, ...props }) => {
  return (
    <SectionContainer {...props}>
      <Optional renderIf={header}>
        <SectionHeader>{header}</SectionHeader>
      </Optional>
      {children}
    </SectionContainer>
  );
};

export default Menu;
