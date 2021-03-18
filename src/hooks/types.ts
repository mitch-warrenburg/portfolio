import { ChatUser } from '../store/types';

export interface UseChatState {
  userId: string;
  error?: string;
  isConnecting: boolean;
  currentChatUser: ChatUser;
}
