export interface ChatEvent {
  body: string;
  senderId: string;
  isForCurrentUser?: boolean;

  [key: string]: any;
}

export interface ChatProps {
  roomId?: string;
  messages: Array<ChatEvent>;
  sendMessage: (message: string) => void;
}
