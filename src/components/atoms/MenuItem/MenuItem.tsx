import React from 'react';
import styled from 'styled-components';
import { MenuItemProps } from './types';

const MenuItem = styled.li<MenuItemProps>`
  display: flex;
  align-items: center;
  font-weight: 400;
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  transition: 0.3s;
  color: ${({ theme }) => theme.colors.font.primary};
  width: 100%;
  
  * {
    pointer-events: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.menu};
  }
`;

export default MenuItem;
