import { MetricCard } from "@/components/dashboard/MetricCard";
import { ConversationList } from "@/components/dashboard/ConversationList";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { MessageSquare, TrendingUp, Clock, AlertCircle } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Monitor AI agent performance and active conversations</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Conversations"
          value={24}
          change="+12% from yesterday"
          changeType="positive"
          icon={MessageSquare}
        />
        <MetricCard
          title="Resolution Rate"
          value="94%"
          change="+2.5% this week"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Avg Response Time"
          value="1.2s"
          change="-0.3s improvement"
          changeType="positive"
          icon={Clock}
        />
        <MetricCard
          title="Escalations"
          value={3}
          change="2 pending review"
          changeType="neutral"
          icon={AlertCircle}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ConversationList />
        <PerformanceChart />
      </div>
    </div>
  );
}
