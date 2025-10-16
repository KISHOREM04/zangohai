import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface TemplateEditorProps {
  onSave: (template: {
    name: string;
    category: string;
    content: string;
    variables: string[];
    shared: boolean;
  }) => void;
  onCancel: () => void;
  initialTemplate?: {
    name: string;
    category: string;
    content: string;
    shared: boolean;
  };
}

export function TemplateEditor({ onSave, onCancel, initialTemplate }: TemplateEditorProps) {
  const [name, setName] = useState(initialTemplate?.name || "");
  const [category, setCategory] = useState(initialTemplate?.category || "");
  const [content, setContent] = useState(initialTemplate?.content || "");
  const [shared, setShared] = useState(initialTemplate?.shared || false);

  const extractVariables = (text: string): string[] => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = text.matchAll(regex);
    return Array.from(new Set(Array.from(matches, m => m[1])));
  };

  const variables = extractVariables(content);

  const handleSave = () => {
    if (!name || !category || !content) return;
    onSave({ name, category, content, variables, shared });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialTemplate ? "Edit Template" : "Create New Template"}</CardTitle>
        <CardDescription>Define a reusable response template with variables</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Template Name</Label>
            <Input 
              placeholder="e.g., Order Status Update" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Input 
              placeholder="e.g., Support, Sales, Returns" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Template Content</Label>
          <Textarea 
            placeholder="Use {{variable_name}} for dynamic content, e.g., Hello {{customer_name}}, your order {{order_id}} is..."
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Use double curly braces for variables: {"{{order_id}}"}, {"{{customer_name}}"}, {"{{amount}}"}, etc.
          </p>
        </div>

        {variables.length > 0 && (
          <div className="space-y-2">
            <Label>Detected Variables</Label>
            <div className="flex flex-wrap gap-2">
              {variables.map((variable) => (
                <Badge key={variable} variant="secondary">
                  {variable}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div className="space-y-0.5">
            <Label>Share with Team</Label>
            <p className="text-sm text-muted-foreground">Make this template available to all supervisors</p>
          </div>
          <Switch checked={shared} onCheckedChange={setShared} />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={!name || !category || !content}>
            {initialTemplate ? "Update" : "Create"} Template
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
