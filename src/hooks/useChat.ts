import socket from '../ws';
import { useEffect } from 'react';
import { UseChatState } from './types';
import { useSelector } from 'react-redux';
import { State, ChatState, ChatUser } from '../store/types';

const defaultChatUser: ChatUser = {
  userId: '',
  username: '',
  messages: [],
  connected: false,
};

const useChat = (): UseChatState => {
  const { users, error, userId, username, isConnecting, currentChatUserId = '' } = useSelector<
    State,
    ChatState
  >(({ chat }) => chat);

  useEffect(() => {
    return () => {
      socket?.disconnect();
    };
  }, [username]);

  return {
    error,
    isConnecting,
    userId: userId || '',
    currentChatUser: users[currentChatUserId] || defaultChatUser,
  };
};

export default useChat;
