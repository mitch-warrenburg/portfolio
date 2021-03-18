import React, {
  FC,
  useState,
  useCallback,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import Icon from '../../atoms/Icon';
import styled from 'styled-components';
import Avatar from '../../atoms/Avatar';
import FlexBox from '../../atoms/FlexBox';
import Optional from '../../atoms/Optional';
import useChat from '../../../hooks/useChat';
import ChatMessage from '../../atoms/ChatMessage';
import { CollapsibleElementProps } from './types';
import { adminAvatar } from '../../../globalConstants';
import StatusIndicator from '../../atoms/StatusIndicator';
import './styles.scss';

const Container = styled.div<CollapsibleElementProps>`
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
    align-items: center;
    justify-content: center;
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

const ChatMessenger: FC = () => {
  const [draft, setDraft] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const { userId, currentChatUser, sendMessage } = useChat();
  const { userId: chatUserId, messages, username, connected } = currentChatUser;

  const draftChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    ({ target }) => {
      setDraft(target.value);
    },
    []
  );

  const headerContainerClickHandler = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const submitButtonHandler = useCallback(() => {
    try {
      sendMessage(draft);
      setDraft('');
    } catch (e) {
      console.error(e);
    }
  }, [draft]);

  const textAreaKeyDownHandler: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    ({ ctrlKey, metaKey, key }) => {
      if ((ctrlKey || metaKey) && key === 'Enter') {
        submitButtonHandler();
      }
    },
    [submitButtonHandler]
  );

  return (
    <Container open={isOpen}>
      <Content open={isOpen}>
        <HeaderContainer open={isOpen} onClick={headerContainerClickHandler}>
          <FlexBox justify="flex-start">
            <Optional renderIf={isOpen}>
              <Avatar image={adminAvatar} />
            </Optional>
            <TitleContainer>
              <h4>{username}</h4>
              <SubTitle open={isOpen}>What should I put here?</SubTitle>
            </TitleContainer>
          </FlexBox>
          <FlexBox justify="flex-end">
            <Optional renderIf={connected}>
              <StatusIndicator status="success">Online</StatusIndicator>
            </Optional>
            <Optional renderIf={connected}>
              <StatusIndicator status="error">Offline</StatusIndicator>
            </Optional>
          </FlexBox>
        </HeaderContainer>
        <MessageSection>
          <MessagesWrapper>
            <MessageScrollPane>
              <MessageScrollContent>
                {messages.map(({ content, from, to }, index) => (
                  <ChatMessage
                    key={`${chatUserId}-${index}}`}
                    content={content}
                    isFromCurrentUser={from === userId}
                  />
                ))}
              </MessageScrollContent>
            </MessageScrollPane>
          </MessagesWrapper>
        </MessageSection>
        <Optional renderIf={isOpen}>
          <MessageTextAreaContainer>
            <textarea
              value={draft}
              onChange={draftChangeHandler}
              onKeyDown={textAreaKeyDownHandler}
              placeholder="Write a message..."
            />
            <button
              type="submit"
              disabled={!draft}
              className="message-submit"
              onClick={submitButtonHandler}>
              <Icon icon="paper-plane" />
            </button>
          </MessageTextAreaContainer>
        </Optional>
      </Content>
    </Container>
  );
};

export default ChatMessenger;
