import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const SOCKET_SERVER_URL = 'http://localhost:9000';

export interface ChatEvent {
  body: string;
  senderId: string;
  ownedByCurrentUser?: boolean;
}

const useChat = (roomId: string) => {
  const [messages, setMessages] = useState<Array<ChatEvent>>([]);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current?.on<'newChatMessage'>(NEW_CHAT_MESSAGE_EVENT, (message: ChatEvent) => {
      const incomingMessage: ChatEvent = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current?.id,
      };

      setMessages(prev => [...prev, incomingMessage]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody: string) => {
    socketRef.current?.emit<'newChatMessage'>(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useChat;
