'use client';

import { useEffect, useRef } from 'react';
import { Message } from '@/app/page';
import { MessageBubble } from '@/components/MessageBubble';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex-1 pt-24 overflow-y-auto space-y-6 [&::-webkit-scrollbar]:hidden
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:hover:bg-gray-300
  [&::-webkit-scrollbar-thumb]:active:bg-gray-400
  [&::-webkit-scrollbar-thumb]:transition-all
  [&::-webkit-scrollbar-thumb]:duration-200
  [&::-webkit-scrollbar-thumb]:ease-in-out
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}