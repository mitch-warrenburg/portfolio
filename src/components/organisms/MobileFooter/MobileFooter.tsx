import React, { FC } from 'react';
import styled from 'styled-components';
import Menu from '../../molecules/Menu';
import { MobileFooterProps } from './types';

const Footer = styled.footer`
  display: none;
  width: 100%;
  flex: 0 1 auto;
  padding: 18px;
  background: ${({ theme }) => theme.colors.background.modal};

  @media screen and (max-width: 780px), screen and (max-height: 600px) {
    display: block;
  }
`;

const MenuGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-items: center;

  @media screen and (max-width: 480px) {
    justify-items: start;
  }
`;

const MobileFooter: FC<MobileFooterProps> = ({ menus, ...props }) => {
  return (
    <Footer {...props}>
      <MenuGrid>
        {menus.map(({ items, label, onClickItem }) => (
          <Menu
            key={`footer-${label}`}
            label={label}
            items={items}
            onClickItem={onClickItem}
          />
        ))}
      </MenuGrid>
    </Footer>
  );
};

MobileFooter.defaultProps = {
  menus: [],
};

export default MobileFooter;
