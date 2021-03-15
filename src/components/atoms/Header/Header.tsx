import React from 'react';
import { HeaderProps } from './types';
import styled from 'styled-components';

const Header = styled.div<HeaderProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  height: 58px;
  width: 100%;
  padding: 0 30px;
  white-space: nowrap;
  pointer-events: initial;
  border-bottom: 1px solid ${({theme}) => theme.colors.divider};

  @media screen and (max-width: 480px) {
    padding: 0 16px;
  }
`;

export default Header;
