import { Dialog } from '@headlessui/react';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import TemplateCard from './TemplateCard';

interface Template {
  id: string;
  type: 'custom' | 'health-care' | 'retail' | 'education' | 'real-estate' | 'corporate' | 'laboratory';
  title: string;
  description: string;
}

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

const mockTemplates: Template[] = [
  {
    id: 'custom',
    type: 'custom',
    title: 'Create Your Own AI Agent',
    description: 'Create your own AI agent from scratch, tailored to your business, your products, your knowledge, your goals, etc.',
  },
  {
    id: 'healthcare',
    type: 'health-care',
    title: 'Healthcare Practice',
    description: 'Perfect for medical practices, clinics, and healthcare providers. Handles appointment scheduling and patient inquiries.',
  },
  {
    id: 'retail',
    type: 'retail',
    title: 'Retail Assistant',
    description: 'Ideal for retail businesses. Handles product inquiries, order status, and customer support.',
  },
  {
    id: 'education',
    type: 'education',
    title: 'Education Support',
    description: 'Designed for educational institutions. Manages student inquiries and administrative tasks.',
  },
  {
    id: 'realestate',
    type: 'real-estate',
    title: 'Real Estate Agent',
    description: 'Perfect for real estate agencies. Handles property inquiries and scheduling viewings.',
  },
  {
    id: 'corporate',
    type: 'corporate',
    title: 'Corporate Support',
    description: 'Ideal for businesses. Manages customer service, sales inquiries, and support tickets.',
  },
  {
    id: 'laboratory',
    type: 'laboratory',
    title: 'Lab Assistant',
    description: 'Perfect for research labs and testing facilities. Manages schedules and equipment tracking.',
  },
];

export default function TemplateModal({ isOpen, onClose, onSelectTemplate }: TemplateModalProps) {
  const [search, setSearch] = useState('');

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(search.toLowerCase()) ||
      template.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

            <div className="inline-block w-full max-w-6xl my-8 text-left align-middle">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative bg-navy-900 rounded-xl shadow-xl"
              >
                {/* Header */}
                <div className="flex flex-col p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Dialog.Title className="text-2xl font-bold text-white">
                        Agent Templates
                      </Dialog.Title>
                      <p className="mt-1 text-sm text-gray-400">
                        Choose a template or create your own AI agent
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-gray-300"
                    >
                      <XMarkIcon className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search templates..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-navy-800 text-white border-none
                        placeholder-gray-400 focus:ring-2 focus:ring-primary-light focus:outline-none"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 grid grid-cols-3 gap-6">
                  {filteredTemplates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      type={template.type}
                      title={template.title}
                      description={template.description}
                      onClick={() => {
                        onSelectTemplate(template);
                        onClose();
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
