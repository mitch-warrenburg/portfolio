import React, { forwardRef } from 'react';
import { FormFieldProps } from './types';
import styled from 'styled-components';
import Input from '../../atoms/Input/Input';
import Optional from '../../atoms/Optional';

const Wrapper = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-flow: column nowrap;
  margin: 0 16px 16px 0;
  max-width: 200px;
  min-width: 140px;
  flex-grow: 1;

  input:disabled {
    color: ${({ theme }) => theme.colors.font.inactive};
  }
`;

const Label = styled.label`
  padding: 0 0 8px 0;
  font-size: 0.875rem;
`;

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(({ label, ...props }, ref) => {
  return (
    <Wrapper>
      <Optional renderIf={label}>
        <Label>{label}</Label>
      </Optional>
      <Input {...props} ref={ref} />
    </Wrapper>
  );
});

export default FormField;
