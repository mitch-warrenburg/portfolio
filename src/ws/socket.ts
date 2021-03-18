import { io } from 'socket.io-client';
import store from '../store';
import {
  NEW_SESSION,
  CONNECT_ERROR,
  USER_SESSIONS,
  USER_CONNECTED,
  PRIVATE_MESSAGE,
  USER_DISCONNECTED,
} from '../hooks/constants';
import {
  setError,
  newSessionEvent,
  userSessionsEvent,
  userConnectedEvent,
  privateMessageEvent,
  userDisconnectedEvent,
} from '../store/state/chatSlice';
import {
  ChatMessage,
  NewSessionEvent,
  UserSessionsEvent,
  UserConnectedEvent,
  UserDisconnectedEvent,
} from '../store/types';

const SOCKET_SERVER_URL = 'http://localhost:9000';
const { dispatch } = store;

const socket = io(SOCKET_SERVER_URL, {
  autoConnect: false,
  forceNew: true,
  transports: ['websocket'],
  auth: cb => {
    const {
      user: { username },
      chat: { userId, sessionId },
    } = store.getState();
    cb({ userId, sessionId, username });
  },
});

socket.on(CONNECT_ERROR, (error: Error) => {
  console.error(error);
  dispatch(setError(error.message));
});

socket.on<typeof NEW_SESSION>(NEW_SESSION, (event: NewSessionEvent) => {
  dispatch(newSessionEvent(event));
});

socket.on<typeof USER_SESSIONS>(USER_SESSIONS, (event: UserSessionsEvent) => {
  dispatch(userSessionsEvent(event));
});

socket.on<typeof PRIVATE_MESSAGE>(PRIVATE_MESSAGE, (event: ChatMessage) => {
  dispatch(privateMessageEvent(event));
});

socket.on<typeof USER_CONNECTED>(USER_CONNECTED, (event: UserConnectedEvent) => {
  dispatch(userConnectedEvent(event));
});

socket.on<typeof USER_DISCONNECTED>(USER_DISCONNECTED, (event: UserDisconnectedEvent) => {
  dispatch(userDisconnectedEvent(event));
});

export const sendMessage = (content: string) => {
  const {
    chat: { userId, currentChatUserId },
  } = store.getState();

  socket.emit<typeof PRIVATE_MESSAGE>(PRIVATE_MESSAGE, {
    content,
    to: currentChatUserId,
    from: userId,
  });
};

export default socket;
