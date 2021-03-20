import React from 'react';
import { HeaderMenuProps } from './types';
import styled from 'styled-components';

const HeaderMenu = styled.div<HeaderMenuProps>`
  display: flex;
  align-items: center;

  a {
    padding: 20px 30px;
    border-bottom: 2px solid transparent;
    color: ${({ theme }) => theme.colors.font.inactive};
    text-decoration: none;
    transition: 0.3s;

    &.is-active,
    &:hover {
      border-bottom: 2px solid ${({ theme }) => theme.colors.font.primary};
      color: ${({ theme }) => theme.colors.font.primary};
    }
  }
`;

export default HeaderMenu;
