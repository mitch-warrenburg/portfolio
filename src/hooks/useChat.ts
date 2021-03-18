import { UseChatState } from './types';
import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  State,
  ChatState,
  ChatMessage,
  NewSessionEvent,
  UserSessionsEvent,
  UserConnectedEvent,
  UserDisconnectedEvent,
  ChatUser,
} from '../store/types';
import {
  NEW_SESSION,
  USER_SESSIONS,
  PRIVATE_MESSAGE,
  USER_CONNECTED,
  USER_DISCONNECTED,
} from './constants';
import {
  newSessionEvent,
  userSessionsEvent,
  userConnectedEvent,
  privateMessageEvent,
  userDisconnectedEvent,
} from '../store/state/chatSlice';

const SOCKET_SERVER_URL = 'http://localhost:9000';

const defaultChatUser: ChatUser = {
  userId: '',
  username: '',
  messages: [],
  connected: false,
};

const useChat = (): UseChatState => {
  const dispatch = useDispatch();
  const socketRef = useRef<Socket>();
  const { users, username, sessionId, userId, currentChatUserId = '' } = useSelector<
    State,
    ChatState
  >(({ chat }) => chat);

  useEffect(() => {
    if (username) {
      socketRef.current = io(SOCKET_SERVER_URL, {
        auth: {
          userId,
          username,
          sessionId,
        },
      });

      socketRef.current.on<typeof NEW_SESSION>(NEW_SESSION, (event: NewSessionEvent) => {
        dispatch(newSessionEvent(event));
      });

      socketRef.current.on<typeof USER_SESSIONS>(USER_SESSIONS, (event: UserSessionsEvent) => {
        dispatch(userSessionsEvent(event));
      });

      socketRef.current.on<typeof PRIVATE_MESSAGE>(PRIVATE_MESSAGE, (event: ChatMessage) => {
        dispatch(privateMessageEvent(event));
      });

      socketRef.current.on<typeof USER_CONNECTED>(
        USER_CONNECTED,
        (event: UserConnectedEvent) => {
          dispatch(userConnectedEvent(event));
        }
      );

      socketRef.current.on<typeof USER_DISCONNECTED>(
        USER_DISCONNECTED,
        (event: UserDisconnectedEvent) => {
          dispatch(userDisconnectedEvent(event));
        }
      );
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [username]);

  const sendMessage = useCallback(
    (content: string) => {
      socketRef.current?.emit<typeof PRIVATE_MESSAGE>(PRIVATE_MESSAGE, {
        content,
        to: currentChatUserId,
        from: userId,
      });
    },
    [userId, currentChatUserId]
  );

  return {
    sendMessage,
    userId: userId || '',
    currentChatUser: users[currentChatUserId] || defaultChatUser,
  };
};

export default useChat;
