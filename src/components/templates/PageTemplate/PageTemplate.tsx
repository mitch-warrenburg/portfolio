import React, { FC } from 'react';
import styled from 'styled-components';
import { PageTemplateProps } from './types';
import PolygonWarpBackdrop from '../../molecules/PolygonWarpBackdrop';

const Content = styled.section`
  top: 32px;
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
  return (
    <>
      <PolygonWarpBackdrop />
      <Content>{children}</Content>
    </>
  );
};

export default PageTemplate;
