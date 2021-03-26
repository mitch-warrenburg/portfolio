import React from 'react';
import styled from 'styled-components';

const MenuListItem = styled.li`
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: flex-start;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  background: ${({ theme }) => theme.colors.background.menuHover};
  cursor: pointer;
`;

export default MenuListItem;
