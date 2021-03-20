import React from 'react';
import { TabProps } from './types';
import styled from 'styled-components';

const Tab = styled.li<TabProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-bottom: 2px solid transparent;
  border-bottom: ${({ selected, theme }) =>
    selected ? `2px solid ${theme.colors.font.primary}` : 'none'};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.font.primary : theme.colors.font.inactive};
  cursor: pointer;
  transition: color ease-in-out 300ms, background-color ease-in-out 200ms;

  &:hover {
    color: ${({ theme }) => theme.colors.font.primary};
  }

  &:hover,
  &:active {
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
