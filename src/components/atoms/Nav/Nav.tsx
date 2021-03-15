import React from 'react';
import { NavProps } from './types';
import styled from 'styled-components';

const Nav = styled.div<NavProps>`
  flex-basis: 240px;
  padding: 26px;
  overflow: auto;
  flex-shrink: 0;
  height: 100vh;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media screen and (max-width: 945px) {
    display: none;
  }
`;

export default Nav;
