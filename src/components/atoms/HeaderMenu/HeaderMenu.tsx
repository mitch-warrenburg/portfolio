import React from 'react';
import { HeaderMenuProps } from './types';
import styled from 'styled-components';

const HeaderMenu = styled.div<HeaderMenuProps>`
  display: flex;
  align-items: center;

  a {
    padding: 20px 30px;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: 0.3s;
    
    color: ${({theme}) => theme.colors.font.inactive};

    &.is-active,
    &:hover {
      color: ${({theme}) => theme.colors.font.primary};
      border-bottom: 2px solid ${({theme}) => theme.colors.font.primary};
    }
  }
`;

export default HeaderMenu;
