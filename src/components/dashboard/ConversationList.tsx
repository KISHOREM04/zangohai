import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Conversation {
  id: string;
  customer: string;
  status: "active" | "resolved" | "escalated";
  lastMessage: string;
  timestamp: string;
  sentiment: "positive" | "neutral" | "negative";
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    customer: "John Smith",
    status: "active",
    lastMessage: "I need help with my order",
    timestamp: "2 min ago",
    sentiment: "neutral"
  },
  {
    id: "2",
    customer: "Sarah Johnson",
    status: "escalated",
    lastMessage: "This is unacceptable!",
    timestamp: "5 min ago",
    sentiment: "negative"
  },
  {
    id: "3",
    customer: "Mike Davis",
    status: "resolved",
    lastMessage: "Thank you for the help",
    timestamp: "10 min ago",
    sentiment: "positive"
  },
  {
    id: "4",
    customer: "Emily Chen",
    status: "active",
    lastMessage: "Can you clarify the shipping?",
    timestamp: "15 min ago",
    sentiment: "neutral"
  },
];

export function ConversationList() {
  const navigate = useNavigate();

  const getStatusIcon = (status: Conversation["status"]) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      case "escalated":
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Conversation["status"]) => {
    switch (status) {
      case "active":
        return "bg-primary";
      case "resolved":
        return "bg-success";
      case "escalated":
        return "bg-destructive";
    }
  };

  const getSentimentColor = (sentiment: Conversation["sentiment"]) => {
    switch (sentiment) {
      case "positive":
        return "text-success";
      case "neutral":
        return "text-muted-foreground";
      case "negative":
        return "text-destructive";
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Active Conversations</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {mockConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => navigate(`/conversations/${conversation.id}`)}
                className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{conversation.customer}</p>
                    <Badge className={getStatusColor(conversation.status)} variant="default">
                      {getStatusIcon(conversation.status)}
                      <span className="ml-1 capitalize">{conversation.status}</span>
                    </Badge>
                  </div>
                  <p className={`text-sm ${getSentimentColor(conversation.sentiment)}`}>
                    {conversation.lastMessage}
                  </p>
                  <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
