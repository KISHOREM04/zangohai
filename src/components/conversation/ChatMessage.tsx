import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant" | "supervisor";
  content: string;
  timestamp: string;
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === "user";
  const isSupervisor = role === "supervisor";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar className={isSupervisor ? "bg-warning" : isUser ? "bg-muted" : "bg-primary"}>
        <AvatarFallback>
          {isSupervisor ? "S" : isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>
      <div className={`flex flex-col gap-1 max-w-[70%] ${isUser ? "items-end" : ""}`}>
        <div className={`rounded-lg px-4 py-2 ${
          isSupervisor 
            ? "bg-warning/10 border border-warning/20" 
            : isUser 
            ? "bg-muted" 
            : "bg-primary/10 border border-primary/20"
        }`}>
          <p className="text-sm">{content}</p>
        </div>
        <span className="text-xs text-muted-foreground">{timestamp}</span>
      </div>
    </div>
  );
}
