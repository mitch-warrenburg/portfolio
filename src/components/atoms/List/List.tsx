import React from 'react';
import { ListProps } from "./types";
import styled from 'styled-components';

const List = styled.ul<ListProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  padding-left: 0;
  margin: 0;
  border-radius: 14px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background.content};
`;

export default List;
