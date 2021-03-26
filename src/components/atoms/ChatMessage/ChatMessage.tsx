import React, { FC } from 'react';
import Avatar from '../Avatar';
import Optional from '../Optional';
import { ChatMessageProps } from './types';
import { bounce, ball } from '../../animations';
import styled, { css } from 'styled-components';
import { adminAvatar, anonymousAvatar } from '../../../globalConstants';

const currentUserProperties = css`
  margin: 8px 0 8px 35px;
  background: linear-gradient(120deg, #248a52, #257287);
  border-radius: 10px 10px 0 10px;
  color: white;
  float: right;
  text-align: right;
`;

const typingProperties = css`
  &::before,
  & span::before,
  & span::after {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    display: block;
    width: 3px;
    height: 3px;
    margin-top: 4px;
    animation: ${ball} 0.45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    content: '';
    transform: translate(-50%, -50%);
  }

  &::before {
    border: none;
    animation-delay: 0.15s;
  }

  & span {
    position: relative;
    display: block;
    width: 20px;
    height: 10px;
    font-size: 0;

    &::before {
      margin-left: -7px;
    }

    &::after {
      margin-left: 7px;
      animation-delay: 0.3s;
    }
  }
`;

const MessageContainer = styled.div<ChatMessageProps>`
  position: relative;
  max-width: 100%;
  padding: 6px 10px 6px 6px;
  margin: 8px 0 20px 40px;
  animation: ${bounce} 500ms linear both;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px 10px 10px 0;
  clear: both;
  color: white;
  float: left;
  font-size: 12px;
  line-height: 1.4;
  overflow-wrap: break-word;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  transform: scale(0);
  transform-origin: 0 0;
  ${({ typing }) => typing && typingProperties}
  ${({ isCurrentUser }) => isCurrentUser && currentUserProperties}
`;

const ChatAvatar = styled(Avatar)`
  position: absolute;
  top: 16px;
  left: -36px;
  width: 30px;
  height: 30px;
  margin: 0;
`;

const ChatMessage: FC<ChatMessageProps> = ({ isAdmin, content, isCurrentUser, ...props }) => {
  return (
    <MessageContainer {...props} isCurrentUser={isCurrentUser}>
      <Optional renderIf={!isCurrentUser}>
        <ChatAvatar image={isAdmin ? anonymousAvatar : adminAvatar} />
      </Optional>
      <span>{content}</span>
    </MessageContainer>
  );
};

ChatMessage.defaultProps = {
  content: '',
  typing: false,
  isAdmin: false,
  isCurrentUser: false,
};

export default ChatMessage;
