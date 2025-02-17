import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import GlowButton from '../common/GlowButton';

interface Template {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

const templates: Template[] = [
  {
    id: '1',
    title: 'Product Launch Announcement',
    content: 'Hi {{name}}, we\'re excited to announce the launch of our new product! Would you be interested in learning more about how it can benefit your business?',
    tags: ['Product', 'Sales', 'Tech', 'B2B']
  },
  {
    id: '2',
    title: 'Service Follow-up',
    content: 'Hello {{name}}, thank you for using our service. We\'d love to hear about your experience. Do you have a moment to share your feedback?',
    tags: ['Customer Service', 'Feedback', 'Service']
  },
  {
    id: '3',
    title: 'Event Invitation',
    content: 'Dear {{name}}, you\'re invited to our exclusive webinar on industry trends. Would you like to secure your spot?',
    tags: ['Events', 'B2B', 'Education']
  },
  {
    id: '4',
    title: 'Healthcare Appointment',
    content: 'Hi {{name}}, this is a reminder about your upcoming appointment. Would you like to confirm or reschedule?',
    tags: ['Healthcare', 'Appointment', 'Service']
  },
  {
    id: '5',
    title: 'Real Estate Showing',
    content: 'Hello {{name}}, based on your preferences, we have a property that matches your criteria. Would you be interested in scheduling a viewing?',
    tags: ['Real Estate', 'Sales', 'B2C']
  }
];

// Get all unique tags
const allTags = Array.from(new Set(templates.flatMap(template => template.tags)));

export default function TemplatesModal({ isOpen, onClose, onSelectTemplate }: TemplatesModalProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(template => {
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => template.tags.includes(tag));
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTags && matchesSearch;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-4xl max-h-[80vh] overflow-hidden rounded-xl
          bg-white/90 dark:bg-gray-800/90 backdrop-blur-md
          border border-gray-200/50 dark:border-gray-700/50
          shadow-xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-lg
            text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
            transition-colors duration-200"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Message Templates
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Choose a template or get inspired for your campaign message
            </p>
          </div>

          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg
                bg-white/50 dark:bg-gray-900/50
                border border-gray-200 dark:border-gray-700
                focus:ring-2 focus:ring-[rgb(0,191,255,0.5)]
                placeholder-gray-500 dark:placeholder-gray-400
                transition-all duration-200"
            />
          </div>

          {/* Tag Cloud */}
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium
                  transition-all duration-200 
                  ${selectedTags.includes(tag)
                    ? 'bg-[rgb(0,191,255,0.9)] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[40vh] overflow-y-auto p-1">
            {filteredTemplates.map(template => (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg
                  bg-white/50 dark:bg-gray-900/50
                  border border-gray-200 dark:border-gray-700
                  hover:border-[rgb(0,191,255,0.5)] dark:hover:border-[rgb(0,191,255,0.5)]
                  transition-all duration-200
                  cursor-pointer"
                onClick={() => onSelectTemplate(template)}
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {template.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {template.content}
                </p>
                <div className="flex flex-wrap gap-1">
                  {template.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-xs
                        bg-gray-100 dark:bg-gray-800
                        text-gray-600 dark:text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
