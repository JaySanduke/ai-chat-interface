'use client';

import { MessageList } from '@/components/MessageList';
import { ChatInput } from '@/components/ChatInput';
import { Message } from '@/app/page';
import { useContext } from 'react';
import { CanvasDataContext } from '@/app/contexts/canvasDataContext';

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export function ChatPanel({ messages, onSendMessage }: ChatPanelProps) {
  const isDocumentVisible = useContext(CanvasDataContext).isCanvasDocumentVisible;

  return (
    <div className={`flex flex-col p-2 bg-zinc-950 transition-all duration-300 ease-in-out sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto ${isDocumentVisible ? 'w-2/7' : 'w-full'
      }`}>
      <MessageList messages={messages} />
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
}