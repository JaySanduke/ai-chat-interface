import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Square, Triangle } from 'lucide-react';

export function Header() {
  return (
    <header className="absolute left-0 w-full h-16 px-4 flex items-center justify-between bg-transparent">
      <div className="flex items-center gap-2">
        <Button variant="outline" className="bg-transparent hover:bg-transparent border-zinc-700 hover:border-zinc-300 text-zinc-300 hover:text-zinc-100 ease-in-out duration-300">
          <Square className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="bg-transparent hover:bg-transparent border-zinc-700 hover:border-zinc-300 text-zinc-300 hover:text-zinc-100 ease-in-out duration-300">
          <Plus className="h-4 w-4" />
        </Button>

        <Select defaultValue="gpt-4">
          <SelectTrigger className="w-32 h-8 bg-transparent border-zinc-700 hover:border-zinc-300 text-zinc-300 hover:text-zinc-100 ease-in-out duration-300">
            <SelectValue placeholder="Chat model" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-700 border-zinc-700">
            <SelectItem value="gpt-4">Chat model</SelectItem>
            <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="private">
          <SelectTrigger className="w-auto h-8 bg-transparent border-zinc-700 hover:border-zinc-300 text-zinc-300 hover:text-zinc-100 ease-in-out duration-300">
            <SelectValue placeholder="Private" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" size="default" className="bg-zinc-100 border-zinc-700 text-black hover:text-zinc-100 hover:bg-zinc-800">
        <Triangle fill='black' className="h-3 w-3 mr-1 text-black" />
        Deploy with Vercel
      </Button>
    </header>
  );
}