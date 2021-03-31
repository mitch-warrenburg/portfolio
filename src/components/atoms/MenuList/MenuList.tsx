import React from 'react';
import styled from 'styled-components';

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  list-style-position: inside;
  list-style-type: none;

  > li {
    margin: 0;
    list-style-position: inside;
    list-style-type: none;
  }
`;

export default MenuList;
