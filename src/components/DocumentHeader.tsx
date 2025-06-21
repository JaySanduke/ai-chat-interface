import { Button } from '@/components/ui/button';
import { CanvasDispatchContext } from '@/contexts/canvasDataContext';
import { X, RotateCcw, RotateCw, Copy, Loader2, Maximize } from 'lucide-react';
import { useContext } from 'react';

interface DocumentHeaderProps {
    title: string | undefined;
    subtitle: string | undefined;
    data: string[] | undefined;
    isDocumentVisible: boolean;
    isCreating?: boolean;
    onClose: () => void;
}

export function DocumentHeader({ title, subtitle, data, isDocumentVisible, isCreating = false, onClose }: DocumentHeaderProps) {

    const dispatch = useContext(CanvasDispatchContext);

    return (
        <div className="flex items-center justify-between p-3 border-b border-zinc-800">
            <div className="flex items-start space-x-3">
                {isDocumentVisible ? <Button
                    size={"icon"}
                    onClick={onClose}
                    className="size-8 p-0 bg-zinc-950 hover:bg-zinc-950 text-zinc-300 hover:text-zinc-100"
                >
                    <X className="size-5" />
                </Button> : (isCreating && <Loader2 className="size-5 animate-spin text-zinc-400" />)}
                <div>
                    <h2 className="text-sm font-medium text-zinc-200">{title}</h2>
                    <p className="text-xs text-zinc-500">{subtitle}</p>
                </div>
            </div>

            {isDocumentVisible ? <div className="flex items-center gap-2">
                <Button size={"icon"} className="size-7 p-0 rounded-sm text-zinc-400 hover:text-zinc-200">
                    <RotateCcw />
                </Button>
                <Button size={"icon"} className="size-7 p-0 rounded-sm text-zinc-400 hover:text-zinc-200">
                    <RotateCw />
                </Button>
                <Button size={"icon"} className="size-7 p-0 rounded-sm text-zinc-400 hover:text-zinc-200">
                    <Copy />
                </Button>
            </div> : <div className="flex items-center gap-2">
                <Button size={"icon"} onClick={() => {
                    dispatch({ type: 'setCanvasData', payload: { title: title ?? '', subtitle: subtitle ?? '', data: data ?? [] } });
                    dispatch({ type: 'set', payload: true });
                }} className="size-8 p-0 bg-transparent rounded-sm text-zinc-400 hover:text-zinc-200">
                    <Maximize className="size-5" />
                </Button> </div>}
        </div>
    );
}