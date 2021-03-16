import { ChatEvent, ChatProps } from './types';
import { io, Socket } from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const SOCKET_SERVER_URL = 'http://localhost:9000';

const useChat = (roomId: string): ChatProps => {
  const [messages, setMessages] = useState<Array<ChatEvent>>([]);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    socketRef.current?.on<'newChatMessage'>(NEW_CHAT_MESSAGE_EVENT, (message: ChatEvent) => {
      const incomingMessage: ChatEvent = {
        ...message,
        isForCurrentUser: message.senderId === socketRef.current?.id,
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

  return { messages, sendMessage, roomId: socketRef.current?.id };
};

export default useChat;
