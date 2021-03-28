import React, { FC } from 'react';
import chroma from 'chroma-js';
import styled from 'styled-components';
import { NotificationProps } from './types';
import { darkTheme } from '../../../themes';
import Optional from '../../atoms/Optional';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';

const Container = styled.div<NotificationProps>`
  display: flex;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border: 1px solid ${({ themeColor }) => chroma(themeColor).alpha(0.5).css()};
  background: ${({ themeColor }) => chroma(themeColor).alpha(0.1).css()};
  border-radius: 8px;
  color: ${({ themeColor }) => chroma(themeColor).alpha(1).css()};

  span {
    margin-right: 8px;
    color: white;
  }

  button {
    border-color: ${({ themeColor }) => chroma(themeColor).alpha(0.8).css()};
    color: white;
  }
`;

const Notification: FC<NotificationProps> = ({ button, message, icon, ...props }) => {
  return (
    <Container {...props}>
      <Optional renderIf={message || icon}>
        <div>
          <Optional renderIf={message}>
            <span>{message}</span>
          </Optional>
          <Optional renderIf={icon}>
            <Icon icon="check" {...icon} />
          </Optional>
        </div>
      </Optional>
      <Optional renderIf={button}>
        <Button {...button}>{button?.text}</Button>
      </Optional>
    </Container>
  );
};

Notification.defaultProps = {
  themeColor: darkTheme.colors.theme.success,
};

export default Notification;
