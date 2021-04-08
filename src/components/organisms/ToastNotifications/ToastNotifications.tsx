import React, { FC, useMemo, memo, useCallback } from 'react';
import Toast from '../../molecules/Toast';
import styled, { useTheme } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { IconName } from '@fortawesome/fontawesome-common-types';
import { removeNotification } from '../../../store/state/uiSlice';
import { RootState, ActionResultNotification } from '../../../store/types';

const Container = styled.div`
  position: fixed;
  z-index: 5;
  top: 110px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  background: transparent;
`;

const ToastNotifications: FC = memo(() => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const notifications = useSelector<RootState, Array<ActionResultNotification>>(
    ({ ui }) => ui.notifications
  );

  const toastNotifications = useMemo(() => {
    return notifications.map(({ id, text, type }) => ({
      id,
      content: text,
      icon: {
        size: 'lg' as SizeProp,
        icon: (type === 'success' ? 'check-circle' : 'exclamation-circle') as IconName,
      },
      themeColor: type === 'success' ? theme.colors.theme.success : theme.colors.theme.error,
    }));
  }, [notifications]);

  const toastCompleteHandler = useCallback(id => {
    dispatch(removeNotification(id));
  }, []);

  return (
    <Container>
      {toastNotifications.map(({ id, ...props }) => (
        <Toast {...props} key={id} id={id} onToastComplete={toastCompleteHandler} />
      ))}
    </Container>
  );
});

ToastNotifications.defaultProps = {
  notifications: [],
};

export default ToastNotifications;
