export interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  totalCalls: number;
  avgDuration: string;
  successRate: number;
  description: string;
  workflows: {
    id: number;
    name: string;
    enabled: boolean;
  }[];
  integrations: {
    id: number;
    name: string;
    enabled: boolean;
  }[];
  recentActivity: {
    id: number;
    phone: string;
    duration: string;
    status: string;
    timestamp: string;
  }[];
  performanceData: {
    date: string;
    successRate: number;
    callVolume: number;
  }[];
}
