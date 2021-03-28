import React from 'react';
import styled from 'styled-components';
import { MenuItemProps } from './types';

const MenuItem = styled.li<MenuItemProps>`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px 10px 10px 0;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.font.primary};
  font-size: 14px;
  font-weight: 400;
  transition: 0.3s;

  * {
    pointer-events: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.menuHover};
  }
`;

export default MenuItem;
