import React from 'react';
import { NavProps } from './types';
import styled from 'styled-components';

const Nav = styled.div<NavProps>`
  position: relative;
  overflow: auto;
  flex-basis: 240px;
  flex-shrink: 0;
  padding: 26px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media screen and (max-width: 720px) {
    display: none;
  }
`;

export default Nav;
