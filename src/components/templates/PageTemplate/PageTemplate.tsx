import React, { FC } from 'react';
import styled from 'styled-components';
import { PageTemplateProps } from './types';

const Content = styled.div`
  top: 32px;
  pointer-events: none;
  position: absolute;
  background: transparent;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;

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
