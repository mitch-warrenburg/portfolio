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
  opacity: 1;
  z-index: 1;
  position: fixed;
  bottom: 0;
  right: 32px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: ease-in-out 300ms;
  min-width: 240px;
  max-height: ${({ open }) => (open ? 500 : 48)}px;
  max-width: ${({ open }) => (open ? 380 : 240)}px;
  border-radius: ${({ open }) => (open ? 20 : 8)}px;
  background: linear-gradient(130deg, rgba(59, 240, 131, 1) 20%, rgba(146, 151, 179, 1) 80%);
  animation: ${fadeIn} ease-in 300ms;
`;

const Content = styled.div<CollapsibleElementProps>`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  overflow: hidden;
  background: rgba(36, 39, 59, 0.85);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: ease-in-out 300ms;
  border: 1px solid rgba(249, 250, 251, 0.3);
  border-radius: ${({ open }) => (open ? 20 : 8)}px;
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
