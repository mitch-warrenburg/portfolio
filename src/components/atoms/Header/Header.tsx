import React from 'react';
import { HeaderProps } from './types';
import styled from 'styled-components';

const Header = styled.div<HeaderProps>`
  display: flex;
  width: 100%;
  height: 58px;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  pointer-events: initial;
  text-align: center;
  vertical-align: center;
  white-space: nowrap;

  > button:last-of-type {
    display: none;
  }

  @media screen and (max-width: 780px), screen and (max-height: 600px) {
    padding: 0 16px;

    > button:last-of-type {
      display: flex;
    }
  }
`;

export default Header;
