'use client';

import { MessageList } from '@/components/MessageList';
import { ChatInput } from '@/components/ChatInput';
import { Message } from '@/app/page';


import { motion, AnimatePresence } from "framer-motion";
import { useContext } from 'react';
import { CanvasDataContext } from '@/contexts/canvasDataContext';

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export function ChatPanel({ messages, onSendMessage }: ChatPanelProps) {

  const { isCanvasDocumentVisible: isDocumentVisible } = useContext(CanvasDataContext);

  return (
    <AnimatePresence>
      <motion.div
        transition={{ duration: 2, ease: 'easeInOut' }}
        initial={isDocumentVisible ? {
          opacity: 0,
          height: '100vh',
          position: 'initial',
        } : {
          opacity: 0,
          height: '100vh',
          position: 'initial',
          margin: '0',
        }}
        animate={isDocumentVisible ? {
          opacity: 1,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '30vw',
          height: '100vh',
        } : {
          opacity: 1,
          height: '100vh',
          position: 'initial',
          margin: 'auto',
        }} className={`flex flex-col p-2 bg-zinc-950 transition-all duration-300 ease-in-out sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto w-full`}>
        <MessageList messages={messages} />
        <ChatInput onSendMessage={onSendMessage} />
      </motion.div>
    </AnimatePresence>
  );
}