import React, { FC } from 'react';
import { MenuItemProps } from './types';
import styled from 'styled-components';
import Optional from '../../atoms/Optional';
import MenuItem from '../../atoms/MenuItem';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

const MenuList = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  cursor: pointer;
  pointer-events: initial;
  white-space: nowrap;

  :not(last-child) {
    margin-bottom: 20px;
  }
`;

const Label = styled.div`
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.font.inactive};
`;

const Menu: FC<MenuItemProps> = ({ items, label, onClickItem, ...props }) => {
  return (
    <MenuContainer {...props}>
      <Optional renderIf={label}>
        <Label>{label}</Label>
      </Optional>
      <MenuList>
        {items.map(({ id, content, onClick }) => (
          <MenuItem key={id} id={id} onClick={onClick || onClickItem}>
            <Optional renderIf={content}>{content}</Optional>
          </MenuItem>
        ))}
      </MenuList>
    </MenuContainer>
  );
};

Menu.defaultProps = {
  items: [],
};

export default Menu;
