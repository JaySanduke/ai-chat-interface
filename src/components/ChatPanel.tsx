'use client';

import { MessageList } from '@/components/MessageList';
import { ChatInput } from '@/components/ChatInput';
import { Message } from '@/app/page';

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isDocumentVisible: boolean;
}

export function ChatPanel({ messages, onSendMessage, isDocumentVisible }: ChatPanelProps) {
  return (
    <div className={`flex flex-col p-2 bg-zinc-950 transition-all duration-300 ease-in-out sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto ${
      isDocumentVisible ? 'w-1/3' : 'w-full'
    }`}>
      <MessageList messages={messages} />
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
}