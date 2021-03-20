import React from 'react';
import styled from 'styled-components';
import { ListItemProps } from './types';

const ListItem = styled.li<ListItemProps>`
  display: flex;
  width: 100%;
  max-height: 40px;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.background.primary : 'initial'};
  cursor: ${({ cursorPointer }) => (cursorPointer ? 'pointer' : 'initial')};
  font-size: 16px;
  list-style: none;
  pointer-events: initial;
  white-space: nowrap;

  &:hover,
  &:hover:not(:active) {
    background-color: ${({ theme }) => theme.colors.background.overlay};
    background-color: ${({ theme, selected }) =>
      selected ? theme.colors.background.primary : theme.colors.background.content};
  }

  &:active,
  &:focus {
    background-color: ${({ theme }) => theme.colors.background.primary};
  }

  & + li {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }

  *:not(button):not(input) {
    pointer-events: none;
  }
`;

export default ListItem;
