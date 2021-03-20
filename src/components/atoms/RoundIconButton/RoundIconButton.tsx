import React, { FC } from 'react';
import Icon from '../Icon';
import styled from 'styled-components';
import { RoundIconButtonProps } from './types';

const Button = styled.button<Partial<RoundIconButtonProps>>`
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 50%;
  color: ${({ theme, color }) => color || theme.colors.font.inactive};
  cursor: pointer;
  outline: none;
  pointer-events: all;
  transition: 250ms ease-in-out;

  svg {
    font-size: 22px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.font.primary};
    transform: scale(1.1, 1.1);
  }
`;

const RoundIconButton: FC<RoundIconButtonProps> = ({ icon, prefix, ...props }) => {
  return (
    <Button {...props} type="button">
      <Icon icon={icon} prefix={prefix} />
    </Button>
  );
};

RoundIconButton.defaultProps = {
  prefix: 'fas',
};

export default RoundIconButton;
