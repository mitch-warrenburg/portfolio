import React, { FC, useMemo, useState } from 'react';
import AuthForm from '../AuthForm';
import styled from 'styled-components';
import { fadeIn } from '../../animations';
import Optional from '../../atoms/Optional';
import ChatMessenger from '../ChatMessenger';
import { useEventCallback } from '../../../hooks';
import { CollapsibleElementProps } from './types';
import { chatAuthFormMessages } from './constants';
import useAuthState from '../../../hooks/useAuthState';
import { useSelector, useDispatch } from 'react-redux';
import { State, UiState } from '../../../store/types';
import { setIsChatMinimized } from '../../../store/state/uiSlice';

const Container = styled.div<CollapsibleElementProps>`
  position: fixed;
  z-index: 6;
  right: 32px;
  bottom: 0;
  width: 100%;
  min-width: 240px;
  max-width: ${({ open }) => (open ? 380 : 240)}px;
  height: 100%;
  max-height: ${({ open }) => (open ? 500 : 48)}px;
  animation: ${fadeIn} ease-in 300ms;
  background: linear-gradient(130deg, rgba(59, 240, 131, 1) 20%, rgba(146, 151, 179, 1) 80%);
  border-radius: ${({ open }) => (open ? 20 : 8)}px;
  opacity: 1;
  pointer-events: all;
  transition: ease-in-out 300ms;

  @media screen and (max-width: 720px), screen and (max-height: 600px) {
    right: 0;
    bottom: 0;
    max-width: ${({ open }) => (open ? '100vw' : '240px')};
    max-height: ${({ open, height }) => (open ? height : 32)}px;
    border-radius: ${({ open }) => (open ? 0 : 8)};
    transition: ease-in-out 50ms;
  }
`;

const Content = styled.div<CollapsibleElementProps>`
  position: relative;
  z-index: 3;
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(249, 250, 251, 0.3);
  background: rgba(36, 39, 59, 0.85);
  border-radius: ${({ open }) => (open ? 20 : 8)}px;
  transition: ease-in-out 300ms;

  @media screen and (max-width: 720px), screen and (max-height: 600px) {
    border: ${({ open }) => (open ? 'none' : '1px solid rgba(249, 250, 251, 0.3)')};
    border-radius: ${({ open }) => (open ? 0 : 8)};
  }
`;
const ChatMessengerWidget: FC = () => {
  const dispatch = useDispatch();
  const [height, setHeight] = useState(window.innerHeight);
  const { isChatOpen, isChatMinimized } = useSelector<State, UiState>(({ ui }) => ui);

  const { isUserFullyAuthenticated, updateAuthStateStatus } = useAuthState();

  const isChatFormShown = useMemo(() => !isUserFullyAuthenticated && !isChatMinimized, [
    isUserFullyAuthenticated,
    isChatMinimized,
  ]);

  const headerContainerClickHandler = useEventCallback(() => {
    updateAuthStateStatus();
    dispatch(setIsChatMinimized(!isChatMinimized));
  });

  const closeButtonClickHandler = useEventCallback(() => {
    updateAuthStateStatus();
    dispatch(setIsChatMinimized(true));
  });

  const textAreaFocusHandler = () => {
    setTimeout(() => setHeight(window.innerHeight), 100);
  };

  return (
    <Optional renderIf={isChatOpen}>
      <Container open={!isChatMinimized} height={height}>
        <Content open={!isChatMinimized}>
          <Optional renderIf={isChatFormShown}>
            <AuthForm
              isVisible={isChatFormShown}
              formMessages={chatAuthFormMessages}
              onClickClose={closeButtonClickHandler}
            />
          </Optional>
          <Optional renderIf={!isChatFormShown}>
            <ChatMessenger
              isChatOpen={isChatOpen}
              isChatMinimized={isChatMinimized}
              onBlurTextArea={textAreaFocusHandler}
              onFocusTextArea={textAreaFocusHandler}
              onClickHeader={headerContainerClickHandler}
            />
          </Optional>
        </Content>
      </Container>
    </Optional>
  );
};

export default ChatMessengerWidget;
