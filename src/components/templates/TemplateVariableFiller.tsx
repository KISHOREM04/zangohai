import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Template {
  id: string;
  name: string;
  category: string;
  content: string;
  variables?: string[];
}

interface TemplateVariableFillerProps {
  templates: Template[];
  onUseTemplate: (filledContent: string) => void;
  onCancel: () => void;
}

export function TemplateVariableFiller({ templates, onUseTemplate, onCancel }: TemplateVariableFillerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState("");

  const extractVariables = (text: string): string[] => {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = text.matchAll(regex);
    return Array.from(new Set(Array.from(matches, m => m[1])));
  };

  const fillTemplate = (template: string, values: Record<string, string>): string => {
    let filled = template;
    Object.entries(values).forEach(([key, value]) => {
      filled = filled.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
    });
    return filled;
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    const vars = extractVariables(template.content);
    const initialValues: Record<string, string> = {};
    vars.forEach(v => initialValues[v] = "");
    setVariableValues(initialValues);
    setPreview(template.content);
  };

  const handleVariableChange = (variable: string, value: string) => {
    const newValues = { ...variableValues, [variable]: value };
    setVariableValues(newValues);
    if (selectedTemplate) {
      setPreview(fillTemplate(selectedTemplate.content, newValues));
    }
  };

  const handleUse = () => {
    onUseTemplate(preview);
  };

  const variables = selectedTemplate ? extractVariables(selectedTemplate.content) : [];
  const allVariablesFilled = variables.every(v => variableValues[v]?.trim());

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Select Template</CardTitle>
          <CardDescription>Choose a template to use</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTemplate?.id === template.id 
                      ? "bg-primary/10 border-primary" 
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="font-medium">{template.name}</p>
                      <Badge variant="secondary" className="text-xs">{template.category}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {template.content}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fill Variables & Preview</CardTitle>
          <CardDescription>
            {selectedTemplate ? "Fill in the required information" : "Select a template first"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedTemplate ? (
            <>
              {variables.length > 0 ? (
                <div className="space-y-3">
                  {variables.map((variable) => (
                    <div key={variable} className="space-y-2">
                      <Label className="capitalize">{variable.replace(/_/g, " ")}</Label>
                      <Input
                        placeholder={`Enter ${variable.replace(/_/g, " ")}`}
                        value={variableValues[variable] || ""}
                        onChange={(e) => handleVariableChange(variable, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No variables in this template</p>
              )}

              <div className="space-y-2 pt-4 border-t">
                <Label>Preview</Label>
                <div className="p-3 rounded-lg bg-muted min-h-[100px]">
                  <p className="text-sm whitespace-pre-wrap">{preview}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={handleUse} 
                  disabled={variables.length > 0 && !allVariablesFilled}
                  className="flex-1"
                >
                  Use This Message
                </Button>
                <Button variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              Select a template to begin
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
