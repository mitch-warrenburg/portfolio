import React, {
  FC,
  useRef,
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
import { sendMessage } from '../../../ws/socket';
import ChatMessage from '../../atoms/ChatMessage';
import { CollapsibleElementProps, ChatMessengerProps } from './types';
import styled, { useTheme } from 'styled-components';
import { adminAvatar } from '../../../globalConstants';
import { useSelector, useDispatch } from 'react-redux';
import StatusIndicator from '../../atoms/StatusIndicator';
import { State, ChatState } from '../../../store/types';
import { disconnectFromChatServer } from '../../../store/state/chatSlice';
import './styles.scss';

const HeaderContainer = styled.div<CollapsibleElementProps>`
  display: flex;
  align-items: center;
  flex: 0 1 56px;
  position: relative;
  height: 100%;
  cursor: pointer;
  z-index: 2;
  color: #fff;
  text-align: left;
  padding: 0 10px;
  transition: ease-in-out 200ms;
  background: ${({ theme }) => theme.colors.background.primary};

  &:hover {
    background: ${({ open, theme }) =>
      open ? theme.colors.background.overlay : theme.colors.background.input};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: normal;
  margin: 0;
  padding: 0;
  font-size: 14px;
  line-height: 1.5;

  * {
    width: 100%;
    white-space: nowrap;
  }
`;

const SubTitle = styled.span<CollapsibleElementProps>`
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
  letter-spacing: 1px;
  display: ${({ open }) => (open ? 'inline-block' : 'none')};
`;

const MessageSection = styled.section`
  flex: 1 1 auto;
  color: rgba(255, 255, 255, 0.5);
  position: relative;
  width: 100%;
`;

const MessagesWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 101%;
  width: 100%;
`;

const MessageTextAreaContainer = styled.div<CollapsibleElementProps>`
  flex: 0 1 40px;
  width: 100%;
  padding: 10px;
  display: flex;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.5);
  background: ${({ theme }) => theme.colors.background.primary};

  textarea {
    text-align: justify;
    background: none;
    border: none;
    outline: none !important;
    resize: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    min-height: 24px;
    margin: 0;
    height: 100%;
    padding-right: 20px;
    width: calc(100% - 42px);

    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }

  button {
    position: absolute;
    z-index: 1;
    top: 10px;
    right: 10px;
    border: none;
    height: 36px;
    width: 36px;
    outline: none;
    cursor: pointer;
    border-radius: 50%;
    transition: background 0.2s ease;
    color: ${({ theme }) => theme.colors.theme.success};
    background: ${({ theme }) => theme.colors.background.dropdown};

    svg {
      margin-right: 2px;
    }

    :hover:not(:disabled) {
      background: rgba(36, 39, 59, 0.8);
      transition: ease-in-out 200ms;
      transform: scale(1.08, 1.08);

      svg {
        transition: ease-in-out 200ms;
        transform: scale(1.08, 1.08);
      }
    }

    :disabled {
      cursor: initial;
      opacity: 0.6;
      color: ${({ theme }) => theme.colors.font.primary};
    }
  }
`;

const MessageScrollPane = styled.div`
  max-height: none;
  position: relative;
  height: 100%;
  max-width: 100%;
  outline: 0;
  direction: ltr;
  overflow: auto;
`;

const MessageScrollContent = styled.div`
  top: 0;
  left: 0;
  margin: 0;
  position: relative;
  overflow: hidden;
  width: auto;
  height: auto;
  padding: 0 10px 20px 10px;
`;

const LoadingOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.background.overlay};

  span {
    font-size: 14px;
    margin-top: 32px;
  }
`;

const ChatMessenger: FC<ChatMessengerProps> = ({ onClickHeader, isChatMinimized }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [draft, setDraft] = useState('');
  const { isConnecting, userId, users, currentChatUserId = '' } = useSelector<
    State,
    ChatState
  >(({ chat }) => chat);

  const messageScrollPaneRef = useRef<HTMLDivElement>(null);
  const { current: scrollPane } = messageScrollPaneRef;

  const currentChatUser = users[currentChatUserId] || {};
  const {
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
    sendMessage(draft);
    setDraft('');
  }, [draft]);

  const textAreaKeyDownHandler: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    ({ ctrlKey, metaKey, key }) => {
      if ((ctrlKey || metaKey) && key === 'Enter') {
        submitButtonHandler();
      }
    },
    [submitButtonHandler]
  );

  const autoScrollMessages = useCallback(() => {
    if (scrollPane) {
      scrollPane.scrollTop = scrollPane.scrollHeight;
    }
  }, [scrollPane]);

  useEffect(() => {
    autoScrollMessages();
  }, [messages.length, autoScrollMessages, isChatMinimized]);

  useEffect(() => {
    return () => {
      dispatch(disconnectFromChatServer({}));
    };
  }, []);

  return (
    <>
      <HeaderContainer open={!isChatMinimized} onClick={onClickHeader}>
        <FlexBox justify="flex-start">
          <Optional renderIf={!isChatMinimized}>
            <Avatar image={adminAvatar} />
          </Optional>
          <TitleContainer>
            <h4>{chatUsername}</h4>
            <SubTitle open={!isChatMinimized}>What should I put here?</SubTitle>
          </TitleContainer>
        </FlexBox>
        <FlexBox justify="flex-end">
          <StatusIndicator status={connected ? 'success' : 'error'}>
            {connected ? 'Online' : 'offline'}
          </StatusIndicator>
        </FlexBox>
      </HeaderContainer>
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
                {messages
                  .filter(({ from, to }) => userId === from || userId === to)
                  .map(({ content, from, to }, index) => (
                    <ChatMessage
                      key={`${chatUserId}-${index}}`}
                      content={content}
                      isFromCurrentUser={from === userId}
                    />
                  ))}
              </MessageScrollContent>
            </MessageScrollPane>
          </Optional>
        </MessagesWrapper>
      </MessageSection>
      <Optional renderIf={!isChatMinimized}>
        <MessageTextAreaContainer>
          <textarea
            value={draft}
            disabled={isConnecting}
            onChange={draftChangeHandler}
            onKeyDown={textAreaKeyDownHandler}
            placeholder="Write a message..."
          />
          <button
            type="submit"
            className="message-submit"
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
