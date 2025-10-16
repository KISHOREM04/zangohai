import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function AgentConfig() {
  const { toast } = useToast();
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([2000]);
  const [capabilities, setCapabilities] = useState({
    refunds: true,
    orderTracking: true,
    productInfo: true,
    complaints: false,
  });

  const handleSave = () => {
    toast({
      title: "Configuration Saved",
      description: "Agent settings have been updated successfully",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Agent Configuration</h2>
        <p className="text-muted-foreground">Adjust AI parameters and capabilities</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Model Parameters</CardTitle>
          <CardDescription>Control the AI model's behavior and response generation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Model</Label>
            <Select defaultValue="gpt-4">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="claude">Claude 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Temperature: {temperature[0]}</Label>
              <span className="text-xs text-muted-foreground">Controls randomness</span>
            </div>
            <Slider
              value={temperature}
              onValueChange={setTemperature}
              min={0}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Max Tokens: {maxTokens[0]}</Label>
              <span className="text-xs text-muted-foreground">Response length limit</span>
            </div>
            <Slider
              value={maxTokens}
              onValueChange={setMaxTokens}
              min={500}
              max={4000}
              step={100}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Agent Capabilities</CardTitle>
          <CardDescription>Enable or disable specific functionalities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Process Refunds</Label>
              <p className="text-sm text-muted-foreground">Allow agent to initiate refunds</p>
            </div>
            <Switch
              checked={capabilities.refunds}
              onCheckedChange={(checked) => setCapabilities({ ...capabilities, refunds: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Order Tracking</Label>
              <p className="text-sm text-muted-foreground">Provide shipment status updates</p>
            </div>
            <Switch
              checked={capabilities.orderTracking}
              onCheckedChange={(checked) => setCapabilities({ ...capabilities, orderTracking: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Product Information</Label>
              <p className="text-sm text-muted-foreground">Answer product-related questions</p>
            </div>
            <Switch
              checked={capabilities.productInfo}
              onCheckedChange={(checked) => setCapabilities({ ...capabilities, productInfo: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Handle Complaints</Label>
              <p className="text-sm text-muted-foreground">Manage customer complaints</p>
            </div>
            <Switch
              checked={capabilities.complaints}
              onCheckedChange={(checked) => setCapabilities({ ...capabilities, complaints: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Escalation Settings</CardTitle>
          <CardDescription>Configure when to escalate to human supervisor</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Confidence Threshold (%)</Label>
            <Input type="number" defaultValue="75" min="0" max="100" />
            <p className="text-xs text-muted-foreground">Escalate when confidence drops below this value</p>
          </div>

          <div className="space-y-2">
            <Label>Sentiment Threshold</Label>
            <Select defaultValue="negative">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="very-negative">Very Negative</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
                <SelectItem value="neutral">Neutral or Lower</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Escalate when sentiment reaches this level</p>
          </div>

          <div className="space-y-2">
            <Label>Max Response Time (seconds)</Label>
            <Input type="number" defaultValue="5" min="1" max="30" />
            <p className="text-xs text-muted-foreground">Escalate if response takes longer than this</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset to Default</Button>
        <Button onClick={handleSave}>Save Configuration</Button>
      </div>
    </div>
  );
}
