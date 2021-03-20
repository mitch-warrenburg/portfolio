import store from '../store';
import { io } from 'socket.io-client';
import { IS_DEBUG } from '../store/config';
import {
  NEW_SESSION,
  MESSAGE_ERROR,
  CONNECT_ERROR,
  USER_SESSIONS,
  TYPING_STATUS,
  USER_CONNECTED,
  PRIVATE_MESSAGE,
  USER_DISCONNECTED,
  TOKEN_AUTH_ERROR_MSG,
} from '../globalConstants';
import {
  websocketError,
  sentMessageAck,
  newSessionEvent,
  userSessionsEvent,
  userConnectedEvent,
  chatUserTypingEvent,
  privateMessageEvent,
  userDisconnectedEvent,
} from '../store/state/chatSlice';
import {
  TypingEvent,
  ChatMessage,
  NewSessionEvent,
  UserSessionsEvent,
  UserConnectedEvent,
  UserDisconnectedEvent,
} from '../store/types';

const { dispatch } = store;
const SOCKET_SERVER_URL = 'ws://localhost:9000';

const socket = io(SOCKET_SERVER_URL, {
  autoConnect: false,
  transports: ['websocket'],
  auth: cb => {
    const {
      user: { username },
      chat: { userId, sessionId, token },
    } = store.getState();

    console.log('connecting...');

    cb({ userId, sessionId, username, token });
  },
});

if (IS_DEBUG) {
  socket.onAny((event, ...args) => console.log(event, args));
}

socket.on(MESSAGE_ERROR, (error: Error) => {
  error && dispatch(websocketError(error));
});

socket.on(CONNECT_ERROR, (error: Error) => {
  dispatch(websocketError(error));
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

socket.on<typeof TYPING_STATUS>(TYPING_STATUS, (event: TypingEvent) => {
  dispatch(chatUserTypingEvent(event));
});

socket.on('disconnect', () => {
  const {
    chat: { error },
  } = store.getState();
  if (error !== TOKEN_AUTH_ERROR_MSG) {
    socket.connect();
  }
});

export const sendMessage = (content: string) => {
  const {
    chat: { userId, currentChatUserId },
  } = store.getState();
  const message = {
    content,
    from: userId,
    to: currentChatUserId,
  };
  socket.emit<typeof PRIVATE_MESSAGE>(PRIVATE_MESSAGE, message, (ackMessage: ChatMessage) => {
    dispatch(sentMessageAck(ackMessage));
  });
};

export const sendTypingEvent = (event: TypingEvent) => {
  socket.emit<typeof TYPING_STATUS>(TYPING_STATUS, event);
};

export default socket;