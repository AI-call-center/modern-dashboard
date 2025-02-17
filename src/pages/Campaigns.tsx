import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Campaign, CampaignFilters } from '../types/campaign';
import CampaignOverview from '../components/campaigns/CampaignOverview';
import CampaignTable from '../components/campaigns/CampaignTable';
import CampaignFiltersBar from '../components/campaigns/CampaignFiltersBar';
import NewCampaignButton from '../components/campaigns/NewCampaignButton';

// Mock data - replace with actual API call
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sales Outreach',
    status: 'running',
    progress: 75,
    successRate: 82,
    totalLeads: 1200,
    callsMade: 900,
    updatedAt: new Date(),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    aiInsights: ['Increase success rate by 15% by calling between 2-4 PM', 'Consider adding personalized greeting']
  },
  {
    id: '2',
    name: 'Product Launch Campaign',
    status: 'paused',
    progress: 45,
    successRate: 68,
    totalLeads: 800,
    callsMade: 360,
    updatedAt: new Date(),
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    aiInsights: ['Resume campaign to maintain momentum', 'Add more context about new features']
  },
  {
    id: '3',
    name: 'Customer Feedback Survey',
    status: 'completed',
    progress: 100,
    successRate: 92,
    totalLeads: 500,
    callsMade: 500,
    updatedAt: new Date(),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    aiInsights: ['High success rate achieved', 'Consider running follow-up campaign']
  }
];

export default function Campaigns() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [filters, setFilters] = useState<CampaignFilters>({
    rowsPerPage: 10,
    page: 1
  });

  const stats = {
    running: campaigns.filter(c => c.status === 'running').length,
    total: campaigns.length
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Overview Cards */}
        <CampaignOverview stats={stats} />

        {/* Search & Filters */}
        <CampaignFiltersBar
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* Campaigns Table */}
        <CampaignTable
          campaigns={campaigns}
          filters={filters}
          onFiltersChange={setFilters}
        />

        {/* New Campaign Button */}
        <NewCampaignButton />
      </motion.div>
    </div>
  );
}
