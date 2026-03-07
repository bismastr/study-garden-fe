import { useState, useRef, useEffect } from "react";
import { useRoomStore } from "../store/useRoomStore";
import { wsService } from "../services/wsService";

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
      <button
        onClick={() => setOpen(true)}
        className="pointer-events-auto bg-amber-100 border-4 border-amber-900 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] font-mono font-bold text-amber-900 px-4 py-2 uppercase tracking-wider hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.3)] active:shadow-none transition-all"
      >
        Chat ({messages.length})
      </button>
    );
  }

  return (
    <div className="pointer-events-auto w-72 h-80 bg-amber-100 border-4 border-amber-900 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b-2 border-amber-900">
        <span className="font-mono font-bold text-amber-900 uppercase tracking-wider text-sm">
          Chat
        </span>
        <button
          onClick={() => setOpen(false)}
          className="font-mono font-bold text-amber-900 hover:text-red-700 px-1"
        >
          x
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 bg-amber-50 border-b-2 border-amber-900">
        {messages.map((msg) => (
          <div key={msg.id} className="font-mono text-xs leading-relaxed">
            <span className="font-bold text-green-800">{msg.username}</span>
            <span className="text-amber-600 ml-1">{formatTs(msg.ts)}</span>
            <p className="text-amber-900">{msg.body}</p>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type..."
          className="flex-1 px-2 py-1.5 font-mono text-sm bg-amber-50 text-amber-900 border-r-2 border-amber-900 outline-none placeholder:text-amber-400"
        />
        <button
          type="submit"
          className="bg-green-700 border-0 text-amber-100 font-mono font-bold px-3 py-1.5 uppercase text-sm hover:bg-green-800 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
