export type CampaignStatus = 'running' | 'paused' | 'completed';

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  progress: number;
  successRate: number;
  totalLeads: number;
  callsMade: number;
  updatedAt: Date;
  createdAt: Date;
  aiInsights?: string[];
}

export interface CampaignFilters {
  status?: CampaignStatus;
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchQuery?: string;
  sortBy?: keyof Campaign;
  sortDirection?: 'asc' | 'desc';
  rowsPerPage: number;
  page: number;
}
