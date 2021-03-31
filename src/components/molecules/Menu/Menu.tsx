import React, { FC } from 'react';
import { MenuProps } from './types';
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
  padding: 0;
  margin: 0;
  cursor: pointer;
  list-style-position: inside;
  list-style-type: none;
  pointer-events: initial;
  white-space: nowrap;

  > li {
    margin: 0;
    list-style-position: inside;
    list-style-type: none;
  }

  :not(last-child) {
    margin-bottom: 20px;
  }
`;

const Label = styled.div`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.font.inactive};
`;

const Menu: FC<MenuProps> = ({ items, label, onClickItem, ...props }) => {
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
