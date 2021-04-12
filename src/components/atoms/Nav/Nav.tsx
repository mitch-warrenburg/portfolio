import React from 'react';
import styled from 'styled-components';

const Nav = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 240px;
  padding: 26px;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media screen and (max-width: 780px), screen and (max-height: 600px) {
    display: none;
    visibility: hidden;
  }
`;

export default Nav;
