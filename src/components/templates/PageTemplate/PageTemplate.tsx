import React, { FC } from 'react';
import styled from 'styled-components';
import { PageTemplateProps } from './types';

const Content = styled.div`
  position: absolute;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: transparent;
  pointer-events: none;

  @media screen and (max-width: 480px) {
    padding: 0.8em;
  }

  img {
    max-width: 100%;
  }
`;

const PageTemplate: FC<PageTemplateProps> = ({ children }) => {
  return <Content>{children}</Content>;
};

export default PageTemplate;
