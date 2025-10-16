import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle, ArrowLeft, Send, UserCog, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ChatMessage } from "@/components/conversation/ChatMessage";
import { VoiceInput } from "@/components/conversation/VoiceInput";
import { TemplateVariableFiller } from "@/components/templates/TemplateVariableFiller";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant" | "supervisor";
  content: string;
  timestamp: string;
}

const mockMessages: Message[] = [
  { role: "user", content: "Hi, I need help with my order #12345", timestamp: "10:30 AM" },
  { role: "assistant", content: "Hello! I'd be happy to help you with your order. Let me look that up for you.", timestamp: "10:30 AM" },
  { role: "user", content: "It was supposed to arrive yesterday but I haven't received it yet", timestamp: "10:31 AM" },
  { role: "assistant", content: "I understand your concern. Let me check the tracking information for order #12345.", timestamp: "10:31 AM" },
];

const mockTemplates = [
  {
    id: "1",
    name: "Order Tracking",
    category: "Support",
    content: "I've checked your order {{order_id}}. Current status: {{status}}. Expected delivery: {{delivery_date}}.",
  },
  {
    id: "2",
    name: "Refund Initiated",
    category: "Financial",
    content: "Your refund of {{amount}} has been processed. It will appear in your account within 5-7 business days.",
  },
  {
    id: "3",
    name: "Shipping Delay",
    category: "Support",
    content: "We apologize for the delay with order {{order_id}}. Due to {{reason}}, your delivery is now expected on {{new_date}}.",
  },
];

export default function Conversations() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isTakenOver, setIsTakenOver] = useState(false);
  const [messages, setMessages] = useState(mockMessages);
  const [inputValue, setInputValue] = useState("");
  const [showTemplates, setShowTemplates] = useState(false);

  const handleTakeover = () => {
    setIsTakenOver(true);
    toast({
      title: "Conversation Taken Over",
      description: "You are now in control of this conversation",
    });
  };

  const handleReturnToAI = () => {
    setIsTakenOver(false);
    toast({
      title: "Returned to AI",
      description: "The AI agent has resumed control",
    });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMessage: Message = {
      role: "supervisor",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  const handleVoiceTranscript = (transcript: string) => {
    setInputValue(prev => prev + (prev ? " " : "") + transcript);
  };

  const handleUseTemplate = (filledContent: string) => {
    setInputValue(filledContent);
    setShowTemplates(false);
    toast({
      title: "Template Applied",
      description: "You can review and edit the message before sending",
    });
  };

  if (!id) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Conversations</h2>
          <p className="text-muted-foreground">Select a conversation to view details</p>
        </div>
        <Card>
          <CardContent className="flex items-center justify-center h-[300px] md:h-[400px]">
            <p className="text-muted-foreground">No conversation selected</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/")} className="w-fit">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold">Conversation with John Smith</h2>
            <p className="text-xs md:text-sm text-muted-foreground">Order #12345 - Support Request</p>
          </div>
          <Badge variant="outline" className="gap-1 w-fit">
            <AlertCircle className="h-3 w-3" />
            <span className="text-xs">Requires Attention</span>
          </Badge>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <CardTitle>Conversation</CardTitle>
              <div className="flex gap-2">
                {!isTakenOver ? (
                  <Button onClick={handleTakeover} className="gap-2 flex-1 sm:flex-none">
                    <UserCog className="h-4 w-4" />
                    <span>Take Over</span>
                  </Button>
                ) : (
                  <>
                    <Button onClick={() => setShowTemplates(true)} variant="outline" className="gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="hidden sm:inline">Templates</span>
                    </Button>
                    <Button onClick={handleReturnToAI} variant="outline" className="gap-2">
                      <span>Return to AI</span>
                    </Button>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-[300px] md:h-[400px] pr-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <ChatMessage key={index} {...message} />
                  ))}
                </div>
              </ScrollArea>
              
              {isTakenOver && (
                <div className="flex gap-2 pt-4 border-t">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                    placeholder="Type or speak your message..."
                    className="flex-1"
                  />
                  <VoiceInput onTranscript={handleVoiceTranscript} />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Conversation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Customer Info</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> John Smith</p>
                  <p><span className="text-muted-foreground">Email:</span> john@example.com</p>
                  <p><span className="text-muted-foreground">Priority:</span> High</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">AI Metrics</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Confidence:</span> 87%</p>
                  <p><span className="text-muted-foreground">Sentiment:</span> Neutral</p>
                  <p><span className="text-muted-foreground">Category:</span> Order Tracking</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Suggested Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs md:text-sm">
                    Check order status
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs md:text-sm">
                    Issue refund
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start text-xs md:text-sm">
                    Escalate to manager
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Use Template</DialogTitle>
          </DialogHeader>
          <TemplateVariableFiller
            templates={mockTemplates}
            onUseTemplate={handleUseTemplate}
            onCancel={() => setShowTemplates(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
