import { useState } from 'react';
import { motion } from 'framer-motion';
import GlowButton from '../components/common/GlowButton';
import TemplatesModal from '../components/campaigns/TemplatesModal';

export default function NewCampaign() {
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Outbound',
    firstMessage: '',
    timezone: 'UTC+4',
    timeRange: {
      start: '09:00',
      end: '17:00'
    }
  });

  const handleTemplateSelect = (template: any) => {
    setFormData(prev => ({
      ...prev,
      firstMessage: template.content
    }));
    setIsTemplatesModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          New Campaign
        </h1>

        {/* Campaign Details Section */}
        <section className="p-6 rounded-xl
          bg-navy-800/90 dark:bg-navy-900/90
          backdrop-blur-lg
          border border-gray-700/50
          shadow-xl"
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            Campaign Details
          </h2>

          <div className="space-y-6">
            {/* Campaign Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Campaign Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Summer Outreach Campaign"
                className="w-full px-4 py-2 rounded-lg
                  bg-navy-700/50
                  border border-gray-600
                  focus:ring-2 focus:ring-[rgb(0,191,255,0.5)]
                  text-white placeholder-gray-400
                  transition-all duration-200"
              />
            </div>

            {/* Campaign Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Campaign Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 rounded-lg
                  bg-navy-700/50
                  border border-gray-600
                  focus:ring-2 focus:ring-[rgb(0,191,255,0.5)]
                  text-white
                  transition-all duration-200"
              >
                <option value="Outbound">Outbound</option>
                <option value="Inbound">Inbound</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>

            {/* First Message */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-300">
                  First Message
                </label>
                <GlowButton
                  type="primary"
                  size="sm"
                  onClick={() => setIsTemplatesModalOpen(true)}
                >
                  Browse Templates
                </GlowButton>
              </div>
              <textarea
                value={formData.firstMessage}
                onChange={(e) => setFormData({ ...formData, firstMessage: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 rounded-lg
                  bg-navy-700/50
                  border border-gray-600
                  focus:ring-2 focus:ring-[rgb(0,191,255,0.5)]
                  text-white placeholder-gray-400
                  transition-all duration-200
                  resize-none"
              />
            </div>
          </div>
        </section>

        {/* Timezone & Scheduling Section */}
        <section className="p-6 rounded-xl
          bg-navy-800/90 dark:bg-navy-900/90
          backdrop-blur-lg
          border border-gray-700/50
          shadow-xl"
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            Timezone & Scheduling
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Timezone
              </label>
              <select
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg
                  bg-navy-700/50
                  border border-gray-600
                  focus:ring-2 focus:ring-[rgb(0,191,255,0.5)]
                  text-white
                  transition-all duration-200"
              >
                <option value="UTC+4">UTC+4</option>
                {/* Add more timezone options */}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Time Range
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="time"
                  value={formData.timeRange.start}
                  onChange={(e) => setFormData({
                    ...formData,
                    timeRange: { ...formData.timeRange, start: e.target.value }
                  })}
                  className="flex-1 px-4 py-2 rounded-lg
                    bg-navy-700/50
                    border border-gray-600
                    focus:ring-2 focus:ring-[rgb(0,191,255,0.5)]
                    text-white
                    transition-all duration-200"
                />
                <span className="text-gray-300">to</span>
                <input
                  type="time"
                  value={formData.timeRange.end}
                  onChange={(e) => setFormData({
                    ...formData,
                    timeRange: { ...formData.timeRange, end: e.target.value }
                  })}
                  className="flex-1 px-4 py-2 rounded-lg
                    bg-navy-700/50
                    border border-gray-600
                    focus:ring-2 focus:ring-[rgb(0,191,255,0.5)]
                    text-white
                    transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Templates Modal */}
      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelectTemplate={handleTemplateSelect}
      />
    </div>
  );
}
