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
  pointer-events: initial;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  white-space: nowrap;
  width: 100%;

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
        {items.map(({ id, content }) => (
          <MenuItem key={id} id={id} onClick={onClickItem}>
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
