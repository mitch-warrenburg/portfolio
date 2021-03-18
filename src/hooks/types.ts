import { ChatUser } from '../store/types';

export type SendMessage = (content: string) => void;

export interface UseChatState {
  userId: string;
  sendMessage: SendMessage;
  currentChatUser: ChatUser;
}
