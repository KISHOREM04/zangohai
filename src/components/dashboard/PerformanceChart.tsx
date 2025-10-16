import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", resolved: 45, escalated: 5 },
  { name: "Tue", resolved: 52, escalated: 3 },
  { name: "Wed", resolved: 48, escalated: 7 },
  { name: "Thu", resolved: 61, escalated: 4 },
  { name: "Fri", resolved: 55, escalated: 6 },
  { name: "Sat", resolved: 38, escalated: 2 },
  { name: "Sun", resolved: 42, escalated: 3 },
];

export function PerformanceChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Weekly Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem'
              }}
            />
            <Bar dataKey="resolved" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="escalated" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
