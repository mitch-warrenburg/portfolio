import React, { FC } from 'react';
import Avatar from '../Avatar';
import styled from 'styled-components';
import { ChatMessageProps } from './types';
import { adminAvatar } from '../../../globalConstants';
import Optional from '../Optional';

const MessageContainer = styled.div<Partial<ChatMessageProps>>`
  clear: both;
  float: left;
  color: white;
  padding: 6px 10px 7px;
  border-radius: 10px 10px 10px 0;
  background: rgba(0, 0, 0, 0.3);
  font-size: 12px;
  line-height: 1.4;
  position: relative;
  transform: scale(0);
  transform-origin: 0 0;
  margin: 8px 0 8px 40px;
  animation: bounce 500ms linear both;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);

  ${({ isFromCurrentUser }) =>
    isFromCurrentUser &&
    `
    float: right;
    color: white;
    text-align: right;
    margin: 8px 0 8px 35px;
    background: linear-gradient(120deg, #248A52, #257287);
    border-radius: 10px 10px 0 10px;
`}
`;

const ChatAvatar = styled(Avatar)`
  position: absolute;
  top: 16px;
  left: -36px;
  margin: 0;
  height: 30px;
  width: 30px;
`;

const ChatMessage: FC<ChatMessageProps> = ({ content, isFromCurrentUser, ...props }) => {
  return (
    <MessageContainer {...props} isFromCurrentUser={isFromCurrentUser}>
      <Optional renderIf={!isFromCurrentUser}>
        <ChatAvatar image={adminAvatar} />
      </Optional>
      <span>{content}</span>
    </MessageContainer>
  );
};
export default ChatMessage;
