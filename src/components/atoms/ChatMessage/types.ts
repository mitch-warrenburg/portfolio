import { HTMLAttributes } from 'react';
import { ChatEvent } from '../../../hooks/types';

export interface ChatMessageProps extends HTMLAttributes<HTMLDivElement>, ChatEvent {}
