import React from 'react';
import styled from 'styled-components';
import { ListItemProps } from './types';

const ListItem = styled.li<ListItemProps>`
  pointer-events: initial;
  list-style: none;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  font-size: 16px;
  width: 100%;
  white-space: nowrap;
  transition: 100ms ease-in-out;
  max-height: 40px;
  justify-content: space-between;
  cursor: ${({ cursorPointer }) => (cursorPointer ? 'pointer' : 'initial')};

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

  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.background.primary : 'initial'};

  & + li {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export default ListItem;
