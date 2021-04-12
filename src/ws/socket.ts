import store from '../store';
import { uniqueId } from 'lodash';
import { io } from 'socket.io-client';
import { IS_DEBUG } from '../store/config';
import { addNotification } from '../store/state/uiSlice';
import {
  CONNECT,
  DISCONNECT,
  NEW_SESSION,
  CONNECT_ERROR,
  USER_SESSIONS,
  TYPING_STATUS,
  USER_CONNECTED,
  PRIVATE_MESSAGE,
  AUTH_ERROR_MSG,
  USER_DISCONNECTED,
  INVALID_USER_ERROR_MSG,
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

const socket = io({
  transports: ['websocket'],
  autoConnect: false,
  auth: cb => {
    const {
      chat: { sessionId },
      user: { uid, username, adminToken },
    } = store.getState();
    cb({ uid, sessionId, username, adminToken });
  },
});

if (IS_DEBUG) {
  socket.onAny((event, ...args) => console.log(event, args));
}

socket.on(CONNECT, () => {
  console.log('Connected to Chat');
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

socket.on<typeof USER_CONNECTED>(USER_CONNECTED, (event: UserConnectedEvent) => {
  dispatch(userConnectedEvent(event));
});

socket.on<typeof USER_DISCONNECTED>(USER_DISCONNECTED, (event: UserDisconnectedEvent) => {
  dispatch(userDisconnectedEvent(event));
});

socket.on<typeof TYPING_STATUS>(TYPING_STATUS, (event: TypingEvent) => {
  dispatch(chatUserTypingEvent(event));
});

socket.on<typeof PRIVATE_MESSAGE>(PRIVATE_MESSAGE, (event: ChatMessage) => {
  const { ui } = store.getState();

  dispatch(privateMessageEvent(event));

  if (ui.isChatOpen && ui.isChatMinimized) {
    dispatch(
      addNotification({ id: uniqueId(), text: 'Received new chat message', type: 'success' })
    );
  }
});

socket.on(DISCONNECT, async () => {
  console.log('Disconnected from Chat');
  setTimeout(() => {
    const {
      user: { uid, username },
      chat: { error = '', sessionId },
    } = store.getState();
    if (
      ![INVALID_USER_ERROR_MSG, AUTH_ERROR_MSG].includes(error) &&
      uid &&
      username &&
      sessionId
    ) {
      socket.connect();
    }
  }, 500);
});

export const sendMessage = (content: string) => {
  const {
    user: { uid },
    chat: { currentChatUid },
  } = store.getState();
  const message = {
    content,
    from: uid,
    to: currentChatUid,
  };
  socket.emit<typeof PRIVATE_MESSAGE>(PRIVATE_MESSAGE, message, (ackMessage: ChatMessage) => {
    dispatch(sentMessageAck(ackMessage));
  });
};

export const sendTypingEvent = (event: TypingEvent) => {
  socket.emit<typeof TYPING_STATUS>(TYPING_STATUS, event);
};

export default socket;
