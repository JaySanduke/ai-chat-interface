'use client';

import { Message } from '@/app/page';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loader';
import { Copy, ThumbsUp, ThumbsDown, Sparkles, FileText } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} space-x-3 max-w-lg overflow-hidden`}>
        {/* Avatar */}
        {!isUser && <div className={`flex-shrink-0  ${isUser ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-zinc-800 ${isUser ? 'bg-zinc-700' : 'bg-transparent'
            }`}>
            {isUser ? (
              <span className="text-xs font-medium text-zinc-200">U</span>
            ) : (
              <Sparkles className="h-5 w-5 text-zinc-300 fill-zinc-200" />
            )}
          </div>
        </div>}

        {/* Message Content */}
        <div className={`flex flex-col w-auto max-w-full ${isUser ? 'text-right' : 'text-left'}`}>
          <div className={`rounded-xl  ${isUser
            ? 'bg-zinc-50 text-black px-3 py-2'
            : 'bg-transparent text-zinc-300'
            }`}>
            {message.status && (
              <div className="flex items-center space-x-2 mb-2 text-sm border border-zinc-700 rounded-lg p-2 text-zinc-400">
                {message.status === 'creating' ? (
                  <div className='flex flex-1 items-start space-x-2'>
                    <div className='flex flex-1'>
                      <span>Creating Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga vitae, eius eaque magnam iusto nihil minima nesciunt esse, nisi laborum, enim natus eveniet ullam exercitationem debitis sapiente id voluptatem? Nostrum! &quot;{message.documentTitle}&quot;</span>
                    </div>
                    <div className='flex flex-shrink-0 p-1'>
                      {/* <Loader  fill='none' stroke='currentColor' className="h-5 w-5 fill-none stroke-current animate-spin  bg-transparent from-blue-600 to-sky-400 to-50%" /> */}
                      <LoadingSpinner></LoadingSpinner>
                    </div>
                  </div>
                ) : (
                  <>
                    <FileText className="h-4 w-4" />
                    <span>Created &quot;{message.documentTitle}&quot;</span>
                  </>
                )}
              </div>
            )}
            <p className="leading-relaxed overflow-hidden whitespace-normal break-words">{message.content}</p>
          </div>

          {/* Action Buttons for AI messages */}
          {!isUser && (
            <div className="flex items-center space-x-2 mt-4">
              <Button variant="outline" size={"sm"} className="bg-transparent border-zinc-700 hover:border-zinc-300 hover:bg-transparent text-zinc-400 hover:text-zinc-300">
                <Copy className="h-3 w-3" />
              </Button>
              <Button variant="outline" size={"sm"} className="bg-transparent border-zinc-700 hover:border-zinc-300 hover:bg-transparent text-zinc-400 hover:text-zinc-300">
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button variant="outline" size={"sm"} className="bg-transparent border-zinc-700 hover:border-zinc-300 hover:bg-transparent text-zinc-400 hover:text-zinc-300">
                <ThumbsDown className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}