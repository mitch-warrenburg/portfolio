import React from 'react';
import styled from 'styled-components';

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 32px 0;
  background: ${({ theme }) => theme.colors.divider};
`;

export default Divider;
