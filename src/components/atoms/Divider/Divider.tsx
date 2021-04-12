import React from 'react';
import styled from 'styled-components';

const Divider = styled.div`
  width: 100%;
  max-width: 1020px;
  height: 1px;
  margin: 32px auto;
  background: ${({ theme }) => theme.colors.divider};
`;

export default Divider;
