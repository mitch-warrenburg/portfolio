import React, { FC } from 'react';
import Nav from '../../atoms/Nav';
import { NavBarProps } from './types';
import Menu from '../../molecules/Menu';

const NavBar: FC<NavBarProps> = ({ menus, ...props }) => {
  return (
    <Nav {...props}>
      {menus.map(({ items, label, onClickItem }) => (
        <Menu key={`nav-${label}`} label={label} items={items} onClickItem={onClickItem} />
      ))}
    </Nav>
  );
};

export default NavBar;
