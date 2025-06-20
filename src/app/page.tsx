'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { ChatPanel } from '@/components/ChatPanel';
import { DocumentViewerPanel } from '@/components/DocumentViewer';

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  status?: 'creating' | 'created';
  documentTitle?: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi there! I'm doing great, thanks for asking. How about you?",
      timestamp: new Date(),
    },
  ]);

  const [isDocumentVisible, setIsDocumentVisible] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<{
    title: string;
    subtitle: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
  } | null>(null);

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response for test match report
    if (content.toLowerCase().includes('test match report')) {
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: 'I am creating a document for your test match report.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);

        // Show creating status
        setTimeout(() => {
          const statusMessage: Message = {
            id: (Date.now() + 2).toString(),
            type: 'ai',
            content: 'Creating "Test Match Report"',
            timestamp: new Date(),
            status: 'creating',
            documentTitle: 'Test Match Report',
          };
          setMessages(prev => [...prev, statusMessage]);

          setTimeout(() => {
            setCurrentDocument({
              title: 'Test Match Report',
              subtitle: 'Updated less than a minute ago',
              data: [
                { Date: '2023-01-15', 'Team 1': 'Australia', 'Team 2': 'India', Venue: 'Sydney Cricket Ground', Result: 'Australia won by 9 wickets' },
                { Date: '2023-02-20', 'Team 1': 'England', 'Team 2': 'New Zealand', Venue: "Lord's", Result: 'Match Drawn' },
                { Date: '2023-03-10', 'Team 1': 'South Africa', 'Team 2': 'Pakistan', Venue: 'Wanderers Stadium', Result: 'South Africa won by 211 runs' },
                { Date: '2023-04-05', 'Team 1': 'West Indies', 'Team 2': 'Sri Lanka', Venue: 'Sabina Park', Result: 'West Indies won by 87 runs' },
                { Date: '2023-05-12', 'Team 1': 'Bangladesh', 'Team 2': 'Zimbabwe', Venue: 'Sher-e-Bangla National Stadium', Result: 'Bangladesh won by 6 wickets' },
              ],
            });
            setIsDocumentVisible(true);

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
    }
  };

  const handleCloseDocument = () => {
    setIsDocumentVisible(false);
    setCurrentDocument(null);
  };

  return (
    <div className="h-screen flex flex-col px-4 pb-2 bg-zinc-950">
      {!isDocumentVisible && <Header />}
      <div className="flex-1 gap-2 flex overflow-hidden">
        <ChatPanel
          messages={messages}
          onSendMessage={handleSendMessage}
          isDocumentVisible={isDocumentVisible}
        />
        <DocumentViewerPanel
          isVisible={isDocumentVisible}
          document={currentDocument}
          onClose={handleCloseDocument}
        />
      </div>
    </div>
  );
}
