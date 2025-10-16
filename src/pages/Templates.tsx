import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  category: string;
  content: string;
}

const mockTemplates: Template[] = [
  {
    id: "1",
    name: "Order Tracking",
    category: "Support",
    content: "I've checked your order #{order_id}. Current status: {status}. Expected delivery: {delivery_date}."
  },
  {
    id: "2",
    name: "Refund Initiated",
    category: "Financial",
    content: "Your refund of {amount} has been processed. It will appear in your account within 5-7 business days."
  },
  {
    id: "3",
    name: "Product Information",
    category: "Sales",
    content: "The {product_name} is currently available. Key features include: {features}. Price: {price}."
  },
];

export default function Templates() {
  const { toast } = useToast();
  const [templates, setTemplates] = useState(mockTemplates);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleDelete = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast({
      title: "Template Deleted",
      description: "The template has been removed successfully",
    });
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Response Templates</h2>
          <p className="text-muted-foreground">Manage pre-configured responses for common scenarios</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Template
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Template</CardTitle>
            <CardDescription>Define a reusable response template</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Template Name</Label>
              <Input placeholder="e.g., Order Confirmation" />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input placeholder="e.g., Support, Sales, Financial" />
            </div>
            <div className="space-y-2">
              <Label>Template Content</Label>
              <Textarea 
                placeholder="Use {variable_name} for dynamic content"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Use curly braces for variables: {"{order_id}"}, {"{customer_name}"}, etc.
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => {
                setIsCreating(false);
                toast({
                  title: "Template Created",
                  description: "New template has been added successfully",
                });
              }}>
                Create Template
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Badge variant="secondary">{template.category}</Badge>
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
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {template.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
