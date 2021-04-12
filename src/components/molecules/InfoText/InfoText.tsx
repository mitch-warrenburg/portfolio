import React, { FC } from 'react';
import Icon from '../../atoms/Icon';
import { InfoTextProps } from './types';
import styled from 'styled-components';

const IconAndText = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;

  svg {
    margin-right: 10px;
  }
`;

const InfoText: FC<InfoTextProps> = ({ text, icon, ...props }) => {
  return (
    <IconAndText {...props}>
      <Icon {...icon} />
      <span>{text}</span>
    </IconAndText>
  );
};

export default InfoText;
