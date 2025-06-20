'use client';

import { Message } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Copy, ThumbsUp, ThumbsDown, Sparkles, FileText, Loader2 } from 'lucide-react';
import { DocumentHeader } from '@/components/DocumentHeader';
import { Spreadsheet } from '@/components/Spreadsheet';

import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useRef, useState } from 'react';
import { CanvasDataContext, CanvasDispatchContext } from '@/app/contexts/canvasDataContext';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.type === 'user';

  const [messageHHeaders, setMessageHHeaders] = useState<unknown[]>([]);

  const isDocumentVisible = useContext(CanvasDataContext).isCanvasDocumentVisible;

  const dispatch = useContext(CanvasDispatchContext);

  const spreadsheetPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message?.documentContent?.data) {
      setMessageHHeaders(message.documentContent.data);
    }
  }, [message, isDocumentVisible]);

  return (
    <AnimatePresence>
      <motion.div initial={
        { opacity: 0, y: 20 }
      }
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
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
                <div className="relative flex flex-col justify-center space-x-2 mb-2 text-sm border border-zinc-700 rounded-lg p-2 text-zinc-400">
                  {message.status !== 'creating' ? (
                    <div className='flex flex-1 items-start space-x-2'>
                      <div className='flex flex-1'>
                        <span>Creating &quot;{message.documentTitle}&quot;</span>
                      </div>
                      <div className='flex flex-shrink-0 p-1'>
                        <Loader2 className="size-5 animate-spin text-zinc-400" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      <span>Created &quot;{message.documentTitle}&quot;</span>
                    </>
                  )}

                  <AnimatePresence>
                    {!isDocumentVisible && <motion.div
                      ref={spreadsheetPreviewRef}
                      layoutId="spreadsheet-box"
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      className='flex border flex-col min-h-80 w-full'>
                      <DocumentHeader
                        title={message.documentContent?.title}
                        subtitle={message.documentContent?.subtitle}
                        onClose={() => { }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 bg-transparent border-zinc-700 hover:border-zinc-300 hover:bg-transparent text-zinc-400 hover:text-zinc-300"
                        onClick={() => {
                          const rect = spreadsheetPreviewRef.current?.getBoundingClientRect();
                          if (rect) dispatch({
                            type: 'setMetadata', payload: {
                              rect: rect,
                            }
                          });
                          dispatch({ type: 'set', payload: true })
                        }}>full</Button>
                      <div className="flex w-full h-full">
                        <Spreadsheet data={messageHHeaders} />
                      </div>
                    </motion.div>}
                  </AnimatePresence>
                </div>
              )}
              <p className="leading-relaxed overflow-hidden whitespace-normal break-words">{message.content}</p>
            </div>

            {/* Action Buttons for AI messages */}
            {!isUser && (
              <motion.div initial={
                { opacity: 0, x: -20 }
              }
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }} className="flex items-center space-x-2 mt-4">
                <Button variant="outline" size={"sm"} className="bg-transparent border-zinc-700 hover:border-zinc-300 hover:bg-transparent text-zinc-400 hover:text-zinc-300">
                  <Copy className="h-3 w-3" />
                </Button>
                <Button variant="outline" size={"sm"} className="bg-transparent border-zinc-700 hover:border-zinc-300 hover:bg-transparent text-zinc-400 hover:text-zinc-300">
                  <ThumbsUp className="h-3 w-3" />
                </Button>
                <Button variant="outline" size={"sm"} className="bg-transparent border-zinc-700 hover:border-zinc-300 hover:bg-transparent text-zinc-400 hover:text-zinc-300">
                  <ThumbsDown className="h-3 w-3" />
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence >
  );
}