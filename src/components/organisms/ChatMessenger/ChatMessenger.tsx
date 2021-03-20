import React, {
  FC,
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import Icon from '../../atoms/Icon';
import Loader from '../../atoms/Loader';
import Avatar from '../../atoms/Avatar';
import FlexBox from '../../atoms/FlexBox';
import Optional from '../../atoms/Optional';
import { useTypingEvents } from '../../../hooks';
import { sendMessage } from '../../../ws/socket';
import ChatMessage from '../../atoms/ChatMessage';
import styled, { useTheme } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { State, ChatState } from '../../../store/types';
import StatusIndicator from '../../atoms/StatusIndicator';
import { CollapsibleElementProps, ChatMessengerProps } from './types';
import { adminAvatar, anonymousAvatar } from '../../../globalConstants';
import { disconnectFromChatServer } from '../../../store/state/chatSlice';

const HeaderContainer = styled.div<CollapsibleElementProps>`
  position: relative;
  z-index: 2;
  display: flex;
  height: 100%;
  flex: 0 1 56px;
  align-items: center;
  padding: 0 10px;
  background: ${({ theme }) => theme.colors.background.primary};
  color: #fff;
  cursor: pointer;
  text-align: left;
  transition: ease-in-out 200ms;

  &:hover {
    background: ${({ open, theme }) =>
      open ? theme.colors.background.overlay : theme.colors.background.input};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.5;

  * {
    width: 100%;
    white-space: nowrap;
  }
`;

const SubTitle = styled.span<CollapsibleElementProps>`
  display: ${({ open }) => (open ? 'inline-block' : 'none')};
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
  letter-spacing: 1px;
`;

const MessageSection = styled.section`
  position: relative;
  width: 100%;
  flex: 1 1 auto;
  color: rgba(255, 255, 255, 0.5);
`;

const MessagesWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 101%;
`;

const MessageTextAreaContainer = styled.div<CollapsibleElementProps>`
  position: relative;
  display: flex;
  width: 100%;
  flex: 0 1 40px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  background: ${({ theme }) => theme.colors.background.primary};

  textarea {
    width: calc(100% - 42px);
    height: 100%;
    min-height: 24px;
    padding-right: 20px;
    border: none;
    margin: 0;
    background: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    outline: none !important;
    resize: none;
    text-align: justify;

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  button {
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
    border: none;
    background: ${({ theme }) => theme.colors.background.dropdown};
    border-radius: 50%;
    color: ${({ theme }) => theme.colors.theme.success};
    cursor: pointer;
    outline: none;
    transition: background 0.2s ease;

    svg {
      margin-right: 2px;
    }

    :hover:not(:disabled) {
      background: rgba(36, 39, 59, 0.8);
      transform: scale(1.08, 1.08);
      transition: ease-in-out 200ms;

      svg {
        transform: scale(1.08, 1.08);
        transition: ease-in-out 200ms;
      }
    }

    :disabled {
      color: ${({ theme }) => theme.colors.font.primary};
      cursor: initial;
      opacity: 0.6;
    }
  }
`;

const MessageScrollPane = styled.div`
  position: relative;
  overflow: auto;
  max-width: 100%;
  height: 100%;
  max-height: none;
  direction: ltr;
  outline: 0;
`;

const MessageScrollContent = styled.div`
  position: relative;
  top: 0;
  left: 0;
  overflow: hidden;
  width: auto;
  height: auto;
  padding: 0 10px 70px 10px;
  margin: 0;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.overlay};

  span {
    margin-top: 32px;
    font-size: 14px;
  }
`;

const ChatMessenger: FC<ChatMessengerProps> = ({ onClickHeader, isChatMinimized }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [draft, setDraft] = useState('');
  const messageScrollPaneRef = useRef<HTMLDivElement>(null);
  const { current: scrollPane } = messageScrollPaneRef;
  const isAdmin = useSelector<State, boolean>(({ user }) => user.isAdmin);
  const { users, isConnecting, userId = '', currentChatUserId = '' } = useSelector<
    State,
    ChatState
  >(({ chat }) => chat);

  const { resetTypingEvents, keyDownHandler } = useTypingEvents(currentChatUserId, userId);

  const currentChatUser = useMemo(() => users[currentChatUserId] || {}, [
    users,
    currentChatUserId,
  ]);

  const {
    typing,
    connected,
    messages = [],
    userId: chatUserId,
    username: chatUsername,
  } = currentChatUser;

  const draftChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    ({ target }) => {
      setDraft(target.value);
    },
    []
  );

  const submitButtonHandler = useCallback(() => {
    resetTypingEvents();
    sendMessage(draft);
    setDraft('');
  }, [draft, resetTypingEvents]);

  const textAreaKeyDownHandler: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    ({ ctrlKey, metaKey, key }) => {
      keyDownHandler();
      (ctrlKey || metaKey) && key === 'Enter' && submitButtonHandler();
    },
    [submitButtonHandler, keyDownHandler]
  );

  const autoScrollMessages = useCallback(() => {
    if (scrollPane) {
      scrollPane.scrollTop = scrollPane.scrollHeight;
    }
  }, [scrollPane]);

  useEffect(() => {
    autoScrollMessages();
  }, [messages, autoScrollMessages, isChatMinimized]);

  useEffect(() => {
    return () => {
      dispatch(disconnectFromChatServer({}));
    };
  }, []);

  useEffect(() => {
    if (!isConnecting) {
      document.getElementById('chat-textarea')?.focus();
    }
  }, [isConnecting]);

  return (
    <>
      <Optional renderIf={users}>
        <HeaderContainer open={!isChatMinimized} onClick={onClickHeader}>
          <FlexBox justify="flex-start">
            <Optional renderIf={!isChatMinimized}>
              <Avatar image={isAdmin ? anonymousAvatar : adminAvatar} />
            </Optional>
            <TitleContainer>
              <h4>{chatUsername}</h4>
              <Optional renderIf={!isAdmin}>
                <SubTitle open={!isChatMinimized}>Lead Fullstack Engineer</SubTitle>
              </Optional>
            </TitleContainer>
          </FlexBox>
          <FlexBox justify="flex-end">
            <StatusIndicator status={connected ? 'success' : 'error'}>
              {connected ? 'Online' : 'offline'}
            </StatusIndicator>
          </FlexBox>
        </HeaderContainer>
      </Optional>
      <MessageSection>
        <MessagesWrapper>
          <Optional renderIf={isConnecting}>
            <LoadingOverlay>
              <Loader color={theme.colors.theme.error} size={2} durationSeconds={1.75} />
              <span>Reconnecting...</span>
            </LoadingOverlay>
          </Optional>
          <Optional renderIf={!isConnecting}>
            <MessageScrollPane ref={messageScrollPaneRef}>
              <MessageScrollContent>
                {messages.map(({ content, from, to }, index) => (
                  <ChatMessage
                    key={`${chatUserId}-${index}}`}
                    content={content}
                    isCurrentUser={from === userId}
                  />
                ))}
                <ChatMessage typing hidden={!typing} />
              </MessageScrollContent>
            </MessageScrollPane>
          </Optional>
        </MessagesWrapper>
      </MessageSection>
      <Optional renderIf={!isChatMinimized}>
        <MessageTextAreaContainer>
          <textarea
            id="chat-textarea"
            autoFocus
            value={draft}
            disabled={isConnecting}
            onChange={draftChangeHandler}
            onKeyDown={textAreaKeyDownHandler}
            placeholder="Write a message..."
          />
          <button
            type="submit"
            onClick={submitButtonHandler}
            disabled={!draft || isConnecting}>
            <Icon icon="paper-plane" />
          </button>
        </MessageTextAreaContainer>
      </Optional>
    </>
  );
};

export default ChatMessenger;
