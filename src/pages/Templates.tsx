import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TemplateEditor } from "@/components/templates/TemplateEditor";

interface Template {
  id: string;
  name: string;
  category: string;
  content: string;
  variables?: string[];
  shared?: boolean;
}

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Order Tracking",
    category: "Support",
    content: "I've checked your order {{order_id}}. Current status: {{status}}. Expected delivery: {{delivery_date}}.",
    variables: ["order_id", "status", "delivery_date"],
    shared: true
  },
  {
    id: "2",
    name: "Refund Initiated",
    category: "Financial",
    content: "Your refund of {{amount}} has been processed. It will appear in your account within 5-7 business days.",
    variables: ["amount"],
    shared: true
  },
  {
    id: "3",
    name: "Product Information",
    category: "Sales",
    content: "The {{product_name}} is currently available. Key features include: {{features}}. Price: {{price}}.",
    variables: ["product_name", "features", "price"],
    shared: false
  },
  {
    id: "4",
    name: "Shipping Delay",
    category: "Support",
    content: "We apologize for the delay with order {{order_id}}. Due to {{reason}}, your delivery is now expected on {{new_date}}. We appreciate your patience.",
    variables: ["order_id", "reason", "new_date"],
    shared: true
  },
];

export default function Templates() {
  const { toast } = useToast();
  const [templates, setTemplates] = useState(mockTemplates);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleSave = (templateData: Omit<Template, 'id'>) => {
    if (editingId) {
      setTemplates(templates.map(t => t.id === editingId ? { ...templateData, id: editingId } : t));
      toast({
        title: "Template Updated",
        description: "The template has been updated successfully",
      });
      setEditingId(null);
    } else {
      const newTemplate = { ...templateData, id: Date.now().toString() };
      setTemplates([...templates, newTemplate]);
      toast({
        title: "Template Created",
        description: "New template has been added successfully",
      });
      setIsCreating(false);
    }
  };

  const handleDelete = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast({
      title: "Template Deleted",
      description: "The template has been removed successfully",
    });
  };

  const editingTemplate = editingId ? templates.find(t => t.id === editingId) : null;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Response Templates</h2>
          <p className="text-muted-foreground">Manage pre-configured responses with variables</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          New Template
        </Button>
      </div>

      {(isCreating || editingId) && (
        <TemplateEditor
          onSave={handleSave}
          onCancel={() => {
            setIsCreating(false);
            setEditingId(null);
          }}
          initialTemplate={editingTemplate ? {
            name: editingTemplate.name,
            category: editingTemplate.category,
            content: editingTemplate.content,
            shared: editingTemplate.shared || false
          } : undefined}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{template.category}</Badge>
                    {template.shared && (
                      <Badge variant="outline" className="gap-1">
                        <Users className="h-3 w-3" />
                        Shared
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingId(template.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {template.content}
              </p>
              {template.variables && template.variables.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {template.variables.map(variable => (
                    <Badge key={variable} variant="outline" className="text-xs">
                      {variable}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
