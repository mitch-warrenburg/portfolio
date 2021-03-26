import React, { FC } from 'react';
import styled from 'styled-components';
import Drawer from '../../atoms/Drawer';
import { MobileMenuProps } from './types';
import MenuList from '../../atoms/MenuList';
import IconButton from '../../atoms/IconButton';
import MenuListItem from '../../atoms/MenuListItem';

const DrawerHeader = styled.div`
  display: flex;
  width: 100%;
  height: 58px;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

const MobileMenu: FC<MobileMenuProps> = ({
  items,
  isOpen,
  onClickItem,
  onClickClose,
  ...props
}) => {
  return (
    <Drawer open={isOpen}>
      <DrawerHeader>
        <h3>Menu</h3>
        <IconButton onClick={onClickClose} icon="times" size="2x" color="white" />
      </DrawerHeader>
      <MenuList {...props}>
        {items.map(({ content, id }) => (
          <MenuListItem key={id} id={id} onClick={onClickItem}>
            {content}
          </MenuListItem>
        ))}
      </MenuList>
    </Drawer>
  );
};

export default MobileMenu;
