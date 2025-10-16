import { useState, useEffect } from "react";

interface Metrics {
  activeConversations: number;
  resolutionRate: number;
  avgResponseTime: number;
  escalations: number;
}

export function useDashboardMetrics() {
  const [metrics, setMetrics] = useState<Metrics>({
    activeConversations: 24,
    resolutionRate: 94,
    avgResponseTime: 1.2,
    escalations: 3,
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let eventSource: EventSource | null = null;

    const connectSSE = () => {
      // In production, this would connect to your actual SSE endpoint
      // For now, we'll simulate real-time updates with setInterval
      const updateMetrics = () => {
        setMetrics(prev => ({
          activeConversations: Math.max(15, prev.activeConversations + Math.floor(Math.random() * 5 - 2)),
          resolutionRate: Math.min(100, Math.max(85, prev.resolutionRate + (Math.random() * 2 - 1))),
          avgResponseTime: Math.max(0.8, prev.avgResponseTime + (Math.random() * 0.2 - 0.1)),
          escalations: Math.max(0, prev.escalations + Math.floor(Math.random() * 3 - 1)),
        }));
      };

      // Update every 2 seconds
      const interval = setInterval(updateMetrics, 2000);
      setIsConnected(true);

      return () => {
        clearInterval(interval);
        setIsConnected(false);
      };
    };

    const cleanup = connectSSE();

    return () => {
      if (cleanup) cleanup();
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  return { metrics, isConnected };
}
