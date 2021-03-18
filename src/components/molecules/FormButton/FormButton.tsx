import React, { FC } from 'react';
import Button from '../../atoms/Button';
import Loader from '../../atoms/Loader';
import { FormButtonProps } from './types';
import Optional from '../../atoms/Optional';

const FormButton: FC<FormButtonProps> = ({
  disabled,
  children,
  isLoading,
  loaderColor,
  loaderAnimationDuration,
  ...props
}) => {
  return (
    <Button {...props} disabled={disabled || isLoading}>
      <Optional renderIf={isLoading}>
        <Loader size={1.25} durationSeconds={loaderAnimationDuration} color={loaderColor} />
      </Optional>
      <Optional renderIf={!isLoading}>{children}</Optional>
    </Button>
  );
};

FormButton.defaultProps = {
  isLoading: false,
  transparent: false,
  loaderAnimationDuration: 1.25,
};

export default FormButton;
