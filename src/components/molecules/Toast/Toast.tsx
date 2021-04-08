import React, { FC, useState, useEffect, useCallback } from 'react';
import chroma from 'chroma-js';
import Icon from '../../atoms/Icon';
import { ToastProps } from './types';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import Optional from '../../atoms/Optional';
import IconButton from '../../atoms/IconButton';
import { useEventCallback } from '../../../hooks';
import { CSSTransition } from 'react-transition-group';
import { toastTtlMs, toastAnimationDurationMs } from './constants';
import './styles.scss';

const Container = styled.div<ToastProps>`
  display: flex;
  width: 100%;
  min-width: 200px;
  max-width: 300px;
  height: 56px;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border: 1px solid
    ${({ themeColor }) => chroma(themeColor).alpha(1).brighten(0.8).saturate(1).css()};
  background: ${({ themeColor }) => chroma(themeColor).alpha(0.95).darken(0.5).css()};
  border-radius: 4px 0 0 4px;
  color: white;
  line-height: 1.3;
  text-align: left;
  vertical-align: baseline;

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  & > button {
    margin-left: 8px;
  }

  & > div > svg {
    margin-right: 8px;
    color: ${({ themeColor }) => chroma(themeColor).alpha(0.95).css()};
  }

  @media screen and (max-width: 720px), screen and (max-height: 600px) {
    height: 36px;
    font-size: 12px;
  }
`;

const Toast: FC<ToastProps> = ({ id, icon, content, onToastComplete, ...props }) => {
  const [show, setShow] = useState(false);

  const toastCompleteHandler = useCallback(() => {
    onToastComplete &&
      setTimeout(() => {
        onToastComplete(id);
      }, toastAnimationDurationMs);
  }, []);

  const closeButtonClickHandler = useEventCallback(() => {
    setShow(false);
    toastCompleteHandler();
  });

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
      toastCompleteHandler();
    }, toastTtlMs);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={show}
      classNames="toast"
      timeout={toastAnimationDurationMs}>
      <Container {...props} id={id} className="toast">
        <FlexBox justify="flex-start">
          <Optional renderIf={icon}>
            <Icon icon="check" {...icon} />
          </Optional>
          {content}
        </FlexBox>
        <IconButton size="lg" icon="times" color="white" onClick={closeButtonClickHandler} />
      </Container>
    </CSSTransition>
  );
};

Toast.defaultProps = {
  content: null,
};

export default Toast;
