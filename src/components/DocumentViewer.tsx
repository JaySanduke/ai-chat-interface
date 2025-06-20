'use client';

import { DocumentHeader } from '@/components/DocumentHeader';
import { Spreadsheet } from '@/components/Spreadsheet';


import { motion, AnimatePresence } from "framer-motion";

interface DocumentViewerPanelProps {
  documentMetadata: unknown | null;
  isVisible: boolean;
  document: {
    title: string;
    subtitle: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
  } | null;
  onClose: () => void;
}

export function DocumentViewerPanel({ documentMetadata, isVisible, document, onClose }: DocumentViewerPanelProps) {
  if (!isVisible || !document) return null;

  return (
    <AnimatePresence>
      <motion.div
        layout
        layoutId="spreadsheet-box"
        initial={{
          width: documentMetadata ? (documentMetadata as { width: number }).width : '100%',
          height: documentMetadata ? (documentMetadata as { height: number }).height : '100%',
          x: documentMetadata ? (documentMetadata as { x: number }).x : 0,
          y: documentMetadata ? (documentMetadata as { y: number }).y : 0,
          // scale: 0.5,
        }}
        animate={{
          height: '100vh',
          width: '70%',
          right: 0,
          top: 0,
          scale: 1,
          position: 'absolute',
        }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        // className="w-5/7 bg-zinc-800 border-l border-zinc-700 flex flex-col transform transition-transform duration-300 ease-in-out">
        className="w-5/7 bg-zinc-800 border-l border-zinc-700 flex flex-col">
        <DocumentHeader
          title={document.title}
          subtitle={document.subtitle}
          onClose={onClose}
        />
        <div className="flex-1 overflow-hidden">
          <Spreadsheet data={document.data} />
        </div>
      </motion.div>
    </AnimatePresence >
  );
}