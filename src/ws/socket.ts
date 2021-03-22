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
  INVALID_USERNAME,
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
  connectToChatServer,
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

const socket = io({
  autoConnect: false,
  auth: cb => {
    const {
      user: { username, token },
      chat: { userId, sessionId },
    } = store.getState();

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

socket.on('disconnect', async () => {
  console.log('Disconnected from chat.');

  setTimeout(() => {
    const {
      chat: { error = '', sessionId },
    } = store.getState();
    if (
      !([TOKEN_AUTH_ERROR_MSG, INVALID_USERNAME] as Array<String>).includes(error) &&
      sessionId
    ) {
      dispatch(connectToChatServer({}));
    }
  }, 1000);
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
