import React, { forwardRef } from 'react';
import Input from '../../atoms/Input';
import styled from 'styled-components';
import { FormFieldProps } from './types';
import Optional from '../../atoms/Optional';

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
  min-width: 160px;
  max-width: 230px;
  flex-flow: column nowrap;
  flex-grow: 1;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 0 0 20px 0;

  input:disabled {
    color: ${({ theme }) => theme.colors.font.inactive};
  }
`;

const Label = styled.label`
  padding: 0 0 6px 0;
  color: ${({ theme }) => theme.colors.font.header};
  font-size: 0.875rem;
`;

const ErrorText = styled.div`
  position: absolute;
  top: 58px;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 4px 0 0 4px;
  color: ${({ theme }) => theme.colors.theme.error};
  font-size: 12px;
`;

const RequiredAsterisk = styled.span`
  position: absolute;
  top: 14px;
  right: -5px;
  color: ${({ theme }) => theme.colors.theme.error};
  font-size: 12px;
`;

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ error, label, required, ...props }, ref) => {
    return (
      <Wrapper>
        <Optional renderIf={required}>
          <RequiredAsterisk>*</RequiredAsterisk>
        </Optional>
        <Optional renderIf={label}>
          <Label>{label}</Label>
        </Optional>
        <Input {...props} ref={ref} required={required} />
        <Optional renderIf={error}>
          <ErrorText>{error}</ErrorText>
        </Optional>
      </Wrapper>
    );
  }
);

FormField.defaultProps = {
  required: false,
};

export default FormField;
