import { createContext } from 'react';

export type canvasDocument = {
  title: string;
  subtitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}


// Use the same action type as in your reducer
export type DocumentViewerAction =
  { type: 'toggle' }
  | { type: 'set'; payload?: boolean }
  | { type: 'setCanvasData'; payload?: canvasDocument | null }
  | { type: 'setMetadata'; payload?: unknown | null }
  | { type: 'reset' };

export const CanvasDataContext = createContext<{
    canvasData: canvasDocument | null;
    metadata: unknown | null;
    isCanvasDocumentVisible: boolean;
}>({
    canvasData: null,
    metadata: null,
    isCanvasDocumentVisible: false,
});

export const CanvasDispatchContext = createContext<React.Dispatch<DocumentViewerAction>>(() => {
    // Default dispatch function does nothing
});