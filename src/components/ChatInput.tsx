'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <>
      {/* <div className="p-4 border-t border-zinc-800"> */}
      <form onSubmit={handleSubmit} className="z-10 rounded-2xl bg-transparent w-full mx-auto">
        <div className="border border-zinc-700 focus-within:ring-2 focus-within:ring-zinc-200 focus-within:ring-offset-3 focus-within:ring-offset-zinc-900 duration-[280] ease-in-out rounded-2xl bg-zinc-900">
          <div className='p-2'>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a message..."
              rows={1}
              className="min-h-[52px] max-h-32 py-3 bg-transparent border-0 resize-none text-zinc-200 placeholder-zinc-500 focus-visible:ring-0"
            />
          </div>
          <div className='flex pb-2 items-center justify-between px-2'>
            <Button
              type="button"
              variant="ghost"
              size={"icon"}
              className="size-10 hover:bg-transparent text-zinc-500 hover:text-zinc-300"
            >
              <Paperclip className='size-5 :-rotate-45' />
            </Button>
            <Button
              type="submit"
              className="size-10 rounded-full bg-zinc-200 hover:bg-zinc-400 text-zinc-800"
              disabled={!message.trim()}
            >
              <ArrowUp className='size-5' />
              {/* <Square className="fill-black stroke-black" /> */}
            </Button>
          </div>
        </div>
      </form>
      {/* </div> */}
    </>
  );
}