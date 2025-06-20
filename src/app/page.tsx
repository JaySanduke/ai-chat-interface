'use client';

import { useReducer, useState } from 'react';
import { Header } from '@/components/Header';
import { ChatPanel } from '@/components/ChatPanel';
import { DocumentViewerPanel } from '@/components/DocumentViewer';

import { CanvasDataContext, CanvasDispatchContext, DocumentViewerAction } from '@/app/contexts/canvasDataContext';

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  status?: 'creating' | 'created';
  documentTitle?: string;
  documentContent?: canvasDocument;
}

export type canvasDocument = {
  title: string;
  subtitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  const [documentViewerState, dispatch] = useReducer(
    (
      state: {
        canvasData: canvasDocument | null;
        metadata: unknown | null;
        isCanvasDocumentVisible: boolean;
      },
      action: DocumentViewerAction
    ) => {
      switch (action.type) {
        case 'toggle':
          return {
            ...state,
            isCanvasDocumentVisible: !state.isCanvasDocumentVisible,
          };
        case 'set':
          return {
            ...state,
            isCanvasDocumentVisible: action.payload ?? false,
          };
        case 'setCanvasData':
          return {
            ...state,
            canvasData: action.payload ?? null,
          };
        case 'setMetadata':
          return {
            ...state,
            metadata: action.payload ?? null,
          };
        case 'reset':
          return {
            canvasData: null,
            metadata: null,
            isCanvasDocumentVisible: false,
          };
        default:
          return state;
      }
    },
    {
      canvasData: null,
      metadata: null,
      isCanvasDocumentVisible: false,
    },
  );

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    if (content.toLowerCase().includes('test match report')) {
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: 'I am creating a document for your test match report.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);

        setTimeout(() => {
          const statusMessage: Message = {
            id: (Date.now() + 2).toString(),
            type: 'ai',
            content: 'Creating "Test Match Report"',
            timestamp: new Date(),
            status: 'creating',
            documentTitle: 'Test Match Report',
            documentContent: {
              title: 'Test Match Report',
              subtitle: 'Updated less than a minute ago',
              data: [
                { Date: '2023-01-15', 'Team 1': 'Australia', 'Team 2': 'India', Venue: 'Sydney Cricket Ground', Result: 'Australia won by 9 wickets' },
                { Date: '2023-02-20', 'Team 1': 'England', 'Team 2': 'New Zealand', Venue: "Lord's", Result: 'Match Drawn' },
                { Date: '2023-03-10', 'Team 1': 'South Africa', 'Team 2': 'Pakistan', Venue: 'Wanderers Stadium', Result: 'South Africa won by 211 runs' },
                { Date: '2023-04-05', 'Team 1': 'West Indies', 'Team 2': 'Sri Lanka', Venue: 'Sabina Park', Result: 'West Indies won by 87 runs' },
                { Date: '2023-05-12', 'Team 1': 'Bangladesh', 'Team 2': 'Zimbabwe', Venue: 'Sher-e-Bangla National Stadium', Result: 'Bangladesh won by 6 wickets' },
              ],
            },
          };
          setMessages(prev => [...prev, statusMessage]);

          setTimeout(() => {

            dispatch({
              type: 'setCanvasData', payload: {
                title: 'Test Match Report',
                subtitle: 'Updated less than a minute ago',
                data: [
                  { Date: '2023-01-15', 'Team 1': 'Australia', 'Team 2': 'India', Venue: 'Sydney Cricket Ground', Result: 'Australia won by 9 wickets' },
                  { Date: '2023-02-20', 'Team 1': 'England', 'Team 2': 'New Zealand', Venue: "Lord's", Result: 'Match Drawn' },
                  { Date: '2023-03-10', 'Team 1': 'South Africa', 'Team 2': 'Pakistan', Venue: 'Wanderers Stadium', Result: 'South Africa won by 211 runs' },
                  { Date: '2023-04-05', 'Team 1': 'West Indies', 'Team 2': 'Sri Lanka', Venue: 'Sabina Park', Result: 'West Indies won by 87 runs' },
                  { Date: '2023-05-12', 'Team 1': 'Bangladesh', 'Team 2': 'Zimbabwe', Venue: 'Sher-e-Bangla National Stadium', Result: 'Bangladesh won by 6 wickets' },
                ],
              }
            });

            dispatch({ type: 'set', payload: true });

            setTimeout(() => {
              setMessages(prev => prev.map(msg =>
                msg.id === (Date.now() + 2).toString()
                  ? { ...msg, status: 'created' }
                  : msg
              ));

              setTimeout(() => {
                const finalMessage: Message = {
                  id: (Date.now() + 3).toString(),
                  type: 'ai',
                  content: "I've created a document titled 'Test Match Report' for you. It's now visible on the right side of your screen. Would you like to add more data or make any modifications?",
                  timestamp: new Date(),
                };
                setMessages(prev => [...prev, finalMessage]);
              }, 500);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 500);
    } else {
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: 'I can help you with that. Please provide more details.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);
    }
  };

  const handleCloseDocument = () => {
    dispatch({ type: 'set', payload: false });
    // setCurrentDocument(null);
  };

  return (
    <CanvasDataContext value={documentViewerState}>
      <CanvasDispatchContext value={dispatch}>
        <div className="h-screen flex flex-col px-4 pb-2 bg-zinc-950">
          {!documentViewerState.isCanvasDocumentVisible && <Header />}
          <div className="flex-1 gap-2 flex overflow-hidden">
            <ChatPanel
              messages={messages}
              onSendMessage={handleSendMessage}
            />
            <DocumentViewerPanel
              documentMetadata={documentViewerState.metadata}
              isVisible={documentViewerState.isCanvasDocumentVisible}
              document={documentViewerState.canvasData}
              onClose={handleCloseDocument}
            />
          </div>
        </div>
      </CanvasDispatchContext>
    </CanvasDataContext>
  );
}
