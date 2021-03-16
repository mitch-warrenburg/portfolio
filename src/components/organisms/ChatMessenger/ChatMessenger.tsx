import React, { FC, useMemo, useState, useCallback, ChangeEventHandler } from 'react';
import { uniqueId } from 'lodash';
import FlexBox from '../../atoms/FlexBox';
import useChat from '../../../hooks/useChat';
import StatusIndicator from '../../atoms/StatusIndicator';
import './styles.scss';

const ChatMessenger: FC = () => {
  const roomId = useMemo(() => uniqueId('chat'), []);
  const { messages, sendMessage } = useChat(roomId);
  const [draft, setDraft] = useState('');

  const draftChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    ({ target }) => {
      setDraft(target.value);
    },
    []
  );

  const submitButtonHandler = useCallback(() => {
    console.log('sending');
    sendMessage(draft);
  }, [draft]);

  return (
    <div className="chat-container">
      <div className="chat">
        <div className="chat-title">
          <FlexBox justify="flex-start">
            <figure className="avatar">
              <img alt="profile-img" src="https://i.imgur.com/rKh11A0.jpg" />
            </figure>
            <div className="chat-title-text">
              <h1>Hitarth Patel</h1>
              <h2>Does that Help?</h2>
            </div>
          </FlexBox>
          <FlexBox align="flex-start" justify="flex-end">
            <StatusIndicator status="success">Online</StatusIndicator>
          </FlexBox>
        </div>
        <div className="messages">
          <div className="messages-content" />
        </div>
        <div className="message-box">
          <textarea
            className="message-input"
            placeholder="Type message..."
            value={draft}
            onChange={draftChangeHandler}
          />
          <button type="submit" className="message-submit" onClick={submitButtonHandler}>
            Send
          </button>
        </div>
      </div>
      <div className="bg" />
    </div>
  );
};

export default ChatMessenger;
