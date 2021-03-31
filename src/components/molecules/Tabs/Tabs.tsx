import React, { FC } from 'react';
import Tab from '../../atoms/Tab';
import { TabsProps } from './types';
import styled from 'styled-components';
import Optional from '../../atoms/Optional';

const TabsContainer = styled.ul`
  display: flex;
  align-items: center;

  @media screen and (max-width: 720px), screen and (max-height: 600px) {
    display: none;
  }
`;

const Tabs: FC<TabsProps> = ({ tabs, onClickTab, selectedId, ...props }) => {
  return (
    <TabsContainer {...props}>
      {tabs.map(({ id, content }) => (
        <Tab key={id} id={id} onClick={onClickTab} selected={id === selectedId}>
          <Optional renderIf={content}>{content}</Optional>
        </Tab>
      ))}
    </TabsContainer>
  );
};

Tabs.defaultProps = {
  tabs: [],
};

export default Tabs;
