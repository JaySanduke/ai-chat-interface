import { Button } from '@/components/ui/button';
import { X, RotateCcw, RotateCw, Copy } from 'lucide-react';

interface DocumentHeaderProps {
    title: string;
    subtitle: string;
    onClose: () => void;
}

export function DocumentHeader({ title, subtitle, onClose }: DocumentHeaderProps) {
    return (
        <div className="flex items-center justify-between p-3 border-b border-zinc-800">
            <div className="flex items-start space-x-3">
                <Button
                size={"icon"}
                    onClick={onClose}
                    className="size-8 p-0 bg-zinc-950 hover:bg-zinc-950 text-zinc-300 hover:text-zinc-100"
                >
                    <X className="size-5" />
                </Button>
                <div>
                    <h2 className="text-sm font-medium text-zinc-200">{title}</h2>
                    <p className="text-xs text-zinc-500">{subtitle}</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button size={"icon"} className="size-7 p-0 rounded-sm text-zinc-400 hover:text-zinc-200">
                    <RotateCcw className="h-4 w-4" />
                </Button>
                <Button size={"icon"} className="size-7 p-0 rounded-sm text-zinc-400 hover:text-zinc-200">
                    <RotateCw className="h-4 w-4" />
                </Button>
                <Button size={"icon"} className="size-7 p-0 rounded-sm text-zinc-400 hover:text-zinc-200">
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}