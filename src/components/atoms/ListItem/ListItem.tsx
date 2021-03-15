import React from 'react';
import styled from 'styled-components';
import { ListItemProps } from './types';

const ListItem = styled.li<ListItemProps>`
  list-style: none;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  font-size: 16px;
  width: 100%;
  height: 100%;
  white-space: nowrap;
  transition: 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.panel};

    &:first-child {
      border-radius: 13px 13px 0 0;
    }

    &:last-child {
      border-radius: 0 0 13px 13px;
    }
  }

  & + li {
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export default ListItem;
