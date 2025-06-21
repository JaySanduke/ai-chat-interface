'use client';

import { DocumentHeader } from '@/components/DocumentHeader';
import { Spreadsheet } from '@/components/Spreadsheet';

import { motion, AnimatePresence } from "framer-motion";

type documentMetadata = {
  rect: {
    width: number;
    height: number;
    top: number;
    bottom: number;
    right: number;
    left: number;
  },
  refElementProperties: {
    borderRadius: string | number;
  };
}

interface DocumentViewerPanelProps {
  documentMetadata: documentMetadata | null;
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
  if (!isVisible || !document || !documentMetadata) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          width: documentMetadata.rect.width,
          height: documentMetadata.rect.height,
          top: documentMetadata.rect.top,
          bottom: documentMetadata.rect.bottom,
          right: documentMetadata.rect.right,
          left: documentMetadata.rect.left,
          borderRadius: "10%",
        }}
        animate={{
          opacity: 1,
          width: "70vw",
          height: "100vh",
          left: `calc(100% - 70vw)`,
          bottom: 0,
          top: 0,
          right: 0,
          borderRadius: 0,
        }}
        style={{
          position: 'fixed',
          zIndex: 1000,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        transition={{ duration: 2, ease: 'easeInOut' }}
        // className="w-5/7 bg-zinc-800 border-l border-zinc-700 flex flex-col transform transition-transform duration-300 ease-in-out">
        className=" bg-zinc-800 border-l border-zinc-700 flex flex-col">
        <DocumentHeader
          title={document.title}
          subtitle={document.subtitle}
          data={[]}
          onClose={onClose}
          isDocumentVisible={isVisible}
          isCreating={false} // Assuming this is not creating, adjust as needed
        />
        <div className="flex-1 overflow-hidden">
          <Spreadsheet data={document.data} />
        </div>
      </motion.div>
    </AnimatePresence >
  );
}