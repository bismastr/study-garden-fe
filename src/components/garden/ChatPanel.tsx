import { useState, useRef, useEffect } from "react";
import { useRoomStore } from "../../store/useRoomStore";
import { wsService } from "../../services/wsService";
import { MessageSquare, Send, X } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import { Button } from "@/components/ui/8bit/button";
import { Input } from "@/components/ui/8bit/input";
import { Badge } from "@/components/ui/8bit/badge";
import { ScrollArea } from "@/components/ui/8bit/scroll-area";

function formatTs(ts: number): string {
  const d = new Date(ts * 1000);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

const ChatPanel = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const messages = useRoomStore((s) => s.messages);
  const username = useRoomStore((s) => s.username);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    wsService.send("chat", { username, message: trimmed });
    setInput("");
  };

  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="pointer-events-auto text-xs uppercase tracking-wider text-primary-foreground hover:bg-primary/80"
      >
        <MessageSquare className="size-3" />
        Chat
        {messages.length > 0 && (
          <Badge variant="default" className="ml-1 text-[8px]">
            {messages.length}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <Card className="pointer-events-auto w-72 bg-card flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between p-3 pb-0">
        <CardTitle className="text-xs uppercase tracking-wider">Chat</CardTitle>
        <Button
          onClick={() => setOpen(false)}
          variant="ghost"
          size="icon"
          className="size-6"
        >
          <X className="size-3" />
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-0 p-0 flex-1">
        {/* Messages */}
        <ScrollArea className="h-56 px-3 py-2">
          <div className="space-y-2">
            {messages.map((msg) => (
              <div key={msg.id} className="retro text-[9px] leading-relaxed">
                <span className="font-bold text-primary">{msg.username}</span>
                <span className="text-muted-foreground ml-1">
                  {formatTs(msg.ts)}
                </span>
                <p className="text-foreground mt-0.5">{msg.body}</p>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="flex items-center gap-0 p-2 pt-0"
        >
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type..."
            font="retro"
            className="flex-1 text-[10px]"
          />
          <Button
            type="submit"
            size="sm"
            className="ml-2 text-[10px] uppercase"
          >
            <Send className="size-3" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatPanel;
