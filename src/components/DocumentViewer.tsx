'use client';

import { DocumentHeader } from '@/components/DocumentHeader';
import { Spreadsheet } from '@/components/Spreadsheet';

interface DocumentViewerPanelProps {
  isVisible: boolean;
  document: {
    title: string;
    subtitle: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
  } | null;
  onClose: () => void;
}

export function DocumentViewerPanel({ isVisible, document, onClose }: DocumentViewerPanelProps) {
  if (!isVisible || !document) return null;

  return (
    <div className="w-2/3 bg-zinc-800 border-l border-zinc-700 flex flex-col transform transition-transform duration-300 ease-in-out">
      <DocumentHeader
        title={document.title}
        subtitle={document.subtitle}
        onClose={onClose}
      />
      <div className="flex-1 overflow-hidden">
        <Spreadsheet data={document.data} />
      </div>
    </div>
  );
}