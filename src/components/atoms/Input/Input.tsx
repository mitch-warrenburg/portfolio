import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  flex-grow: 1;
  padding: 8px;
  border: ${({ theme }) => `1px solid ${theme.colors.border}`};
  background: ${({ theme }) => theme.colors.background.input};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.font.primary};
  font-size: 1rem;
  outline: none;
`;

export default Input;
