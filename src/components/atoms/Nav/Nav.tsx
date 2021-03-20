import React from 'react';
import { NavProps } from './types';
import styled from 'styled-components';

const Nav = styled.div<NavProps>`
  overflow: auto;
  height: 100vh;
  flex-basis: 240px;
  flex-shrink: 0;
  padding: 26px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media screen and (max-width: 945px) {
    display: none;
  }
`;

export default Nav;
