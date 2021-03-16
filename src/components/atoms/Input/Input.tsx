import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  flex-grow: 1;
  border-radius: 4px;
  padding: 8px;
  font-size: 0.875rem;
  outline: none;
  color: ${({ theme }) => theme.colors.font.primary};
  border: ${({ theme }) => `1px solid ${theme.colors.border}`};
  background: ${({ theme }) => theme.colors.background.input};
`;

export default Input;
