import React from 'react';
import { ListProps } from './types';
import styled from 'styled-components';

const List = styled.ul<ListProps>`
  display: flex;
  overflow: auto;
  width: 100%;
  height: 100%;
  max-height: none;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0;
  background-color: ${({ theme }) => theme.colors.background.content};
  border-radius: 14px;
  pointer-events: initial;
`;

export default List;
