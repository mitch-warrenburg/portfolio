import React, { FC, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animations';
import ChatMessenger from './ChatMessenger';
import Optional from '../../atoms/Optional';
import ChatSignUpForm from '../ChatSignUpForm';
import { CollapsibleElementProps } from './types';
import { useSelector, useDispatch } from 'react-redux';
import { State, UiState, ChatState } from '../../../store/types';
import { setIsChatMinimized } from '../../../store/state/uiSlice';
import './styles.scss';

const Container = styled.div<CollapsibleElementProps>`
  position: fixed;
  z-index: 1;
  right: 32px;
  bottom: 0;
  overflow: hidden;
  width: 100%;
  min-width: 240px;
  max-width: ${({ open }) => (open ? 380 : 240)}px;
  height: 100%;
  max-height: ${({ open }) => (open ? 500 : 48)}px;
  animation: ${fadeIn} ease-in 300ms;
  background: linear-gradient(130deg, rgba(59, 240, 131, 1) 20%, rgba(146, 151, 179, 1) 80%);
  border-radius: ${({ open }) => (open ? 20 : 8)}px;
  opacity: 1;
  transition: ease-in-out 300ms;
`;

const Content = styled.div<CollapsibleElementProps>`
  position: relative;
  z-index: 2;
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
`;

const ChatMessengerWidget: FC = () => {
  const dispatch = useDispatch();
  const { userId, error } = useSelector<State, ChatState>(({ chat }) => chat);
  const { isChatOpen, isChatMinimized } = useSelector<State, UiState>(({ ui }) => ui);

  const isChatFormShown = useMemo(() => (!userId || !!error) && !isChatMinimized, [
    userId,
    error,
    isChatMinimized,
  ]);

  const headerContainerClickHandler = useCallback(() => {
    dispatch(setIsChatMinimized(!isChatMinimized));
  }, [isChatMinimized]);

  return (
    <Optional renderIf={isChatOpen}>
      <Container open={!isChatMinimized}>
        <Content open={!isChatMinimized}>
          <Optional renderIf={isChatFormShown}>
            <ChatSignUpForm />
          </Optional>
          <Optional renderIf={!isChatFormShown}>
            <ChatMessenger
              isChatOpen={isChatOpen}
              isChatMinimized={isChatMinimized}
              onClickHeader={headerContainerClickHandler}
            />
          </Optional>
        </Content>
      </Container>
    </Optional>
  );
};

export default ChatMessengerWidget;
