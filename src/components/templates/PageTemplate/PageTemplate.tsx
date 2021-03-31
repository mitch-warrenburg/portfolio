import React, { FC } from 'react';
import styled from 'styled-components';
import { PageTemplateProps } from './types';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 240px;
  height: 100%;
  pointer-events: all;

  @media screen and (max-width: 720px), screen and (max-height: 600px) {
    left: 0;
  }
`;

const ScrollPane = styled.div`
  position: relative;
  height: 100%;
  max-height: none;
  overflow-x: hidden;
  overflow-y: auto;
  pointer-events: all;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: none;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
`;

const PageTemplate: FC<PageTemplateProps> = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <ScrollPane>
        <Content>{children}</Content>
      </ScrollPane>
    </Container>
  );
};

export default PageTemplate;
