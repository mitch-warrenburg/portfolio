import React from 'react';
import { TabProps } from './types';
import styled from 'styled-components';

const Tab = styled.li<TabProps>`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid transparent;
  transition: 0.3s;
  cursor: pointer;
  color: ${({ selected, theme }) =>
    selected ? theme.colors.font.primary : theme.colors.font.inactive};
  border-bottom: ${({ selected, theme }) =>
    selected ? `2px solid ${theme.colors.font.primary}` : 'none'};

  &:hover {
    color: ${({ theme }) => theme.colors.font.primary};
    background: ${({ theme }) => theme.colors.background.menuHover};
  }

  * {
    pointer-events: none;
  }
`;

Tab.defaultProps = {
  selected: false,
};

export default Tab;
