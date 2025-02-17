import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Template {
  id: string;
  content: string;
  tags: string[];
}

const templates: Template[] = [
  {
    id: '1',
    content: 'Hello! How can I assist you today?',
    tags: ['friendly', 'general']
  },
  {
    id: '2',
    content: 'Welcome! I\'m here to help with any questions you might have.',
    tags: ['welcoming', 'professional']
  },
  {
    id: '3',
    content: 'Hi there! What brings you here today?',
    tags: ['casual', 'engaging']
  },
  {
    id: '4',
    content: 'Greetings! How may I be of service?',
    tags: ['formal', 'professional']
  },
  {
    id: '5',
    content: 'Hey! Ready to help you with whatever you need.',
    tags: ['casual', 'friendly']
  }
];

const allTags = Array.from(new Set(templates.flatMap(t => t.tags)));

interface GreetingTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (content: string) => void;
}

export default function GreetingTemplateModal({ isOpen, onClose, onSelect }: GreetingTemplateModalProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => template.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 dark:bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                    Select Greeting Template
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Search Input */}
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates..."
                  className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-navy-700 dark:focus:ring-navy-400 focus:border-transparent"
                />

                {/* Tag Cloud */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {allTags.map(tag => (
                    <motion.button
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTagClick(tag)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                        ${selectedTags.includes(tag)
                          ? 'bg-navy-700 text-white dark:bg-navy-400 dark:text-gray-900'
                          : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>

                {/* Template List */}
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {filteredTemplates.map(template => (
                    <motion.button
                      key={template.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => {
                        onSelect(template.content);
                        onClose();
                      }}
                      className="w-full p-4 text-left rounded-lg border border-gray-200 dark:border-gray-700
                        hover:border-navy-700 dark:hover:border-navy-400 transition-colors
                        bg-white dark:bg-gray-700 group"
                    >
                      <p className="text-gray-900 dark:text-white mb-2">
                        {template.content}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs rounded-full
                              bg-gray-100 dark:bg-gray-600
                              text-gray-600 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
