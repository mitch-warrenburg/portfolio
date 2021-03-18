import React from 'react';
import { ListProps } from './types';
import styled from 'styled-components';

const List = styled.ul<ListProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  padding-left: 0;
  margin: 0;
  max-height: none;
  overflow: auto;
  border-radius: 14px;
  pointer-events: initial;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background.content};
`;

export default List;
