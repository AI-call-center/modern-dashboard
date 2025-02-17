import { useState } from 'react';
import { motion } from 'framer-motion';
import GlowButton from '../common/GlowButton';
import TemplatesModal from './TemplatesModal';

export default function CampaignForm() {
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
    <div className="space-y-8">
      <section className="p-6 rounded-xl
        bg-white/80 dark:bg-gray-800/80
        backdrop-blur-lg
        border border-gray-200/50 dark:border-gray-700/50
        shadow-xl"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Campaign Details
        </h2>

        <div className="space-y-6">
          {/* Campaign Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Campaign Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Summer Outreach Campaign"
              className="w-full px-4 py-2 rounded-lg
                bg-white/50 dark:bg-gray-900/50
                border border-gray-200 dark:border-gray-700
                focus:ring-2 focus:ring-[rgb(0,191,255,0.5)]
                placeholder-gray-500 dark:placeholder-gray-400
                transition-all duration-200"
            />
          </div>

          {/* Campaign Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Campaign Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-2 rounded-lg
                bg-white/50 dark:bg-gray-900/50
                border border-gray-200 dark:border-gray-700
                focus:ring-2 focus:ring-[rgb(0,191,255,0.5)]
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                bg-white/50 dark:bg-gray-900/50
                border border-gray-200 dark:border-gray-700
                focus:ring-2 focus:ring-[rgb(0,191,255,0.5)]
                placeholder-gray-500 dark:placeholder-gray-400
                transition-all duration-200
                resize-none"
            />
          </div>
        </div>
      </section>

      {/* Templates Modal */}
      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelectTemplate={handleTemplateSelect}
      />
    </div>
  );
}
