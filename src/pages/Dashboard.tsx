import { MetricCard } from "@/components/dashboard/MetricCard";
import { ConversationList } from "@/components/dashboard/ConversationList";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { MessageSquare, TrendingUp, Clock, AlertCircle, Wifi } from "lucide-react";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { metrics, isConnected } = useDashboardMetrics();

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-sm md:text-base text-muted-foreground">Monitor AI agent performance in real-time</p>
        </div>
        <Badge variant={isConnected ? "default" : "secondary"} className="gap-1 w-fit">
          <Wifi className="h-3 w-3" />
          {isConnected ? "Live Updates" : "Connecting..."}
        </Badge>
      </div>

      <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Conversations"
          value={metrics.activeConversations}
          change="+12% from yesterday"
          changeType="positive"
          icon={MessageSquare}
        />
        <MetricCard
          title="Resolution Rate"
          value={`${metrics.resolutionRate.toFixed(1)}%`}
          change="+2.5% this week"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="Avg Response Time"
          value={`${metrics.avgResponseTime.toFixed(1)}s`}
          change="-0.3s improvement"
          changeType="positive"
          icon={Clock}
        />
        <MetricCard
          title="Escalations"
          value={metrics.escalations}
          change="2 pending review"
          changeType="neutral"
          icon={AlertCircle}
        />
      </div>

      <div className="grid gap-3 md:gap-4 grid-cols-1 lg:grid-cols-2">
        <ConversationList />
        <PerformanceChart />
      </div>
    </div>
  );
}
