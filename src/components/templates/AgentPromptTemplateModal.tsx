import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Template {
  id: string;
  content: string;
  tags: string[];
  description: string;
}

const templates: Template[] = [
  {
    id: '1',
    content: `You are a helpful customer service agent. Your role is to:
1. Listen carefully to customer inquiries
2. Ask clarifying questions when needed
3. Provide accurate and helpful information
4. Show empathy and understanding
5. Resolve issues efficiently while maintaining a professional tone
6. Follow up to ensure customer satisfaction

Remember to:
- Be patient and courteous
- Use clear, simple language
- Acknowledge customer concerns
- Offer practical solutions
- Document important details`,
    tags: ['inbound', 'customer-service', 'general'],
    description: 'General customer service agent prompt'
  },
  {
    id: '2',
    content: `You are a technical support specialist. Your role is to:
1. Diagnose technical issues through careful questioning
2. Guide users through troubleshooting steps
3. Explain technical concepts in simple terms
4. Document all steps taken and solutions provided
5. Escalate complex issues when necessary

Technical Guidelines:
- Start with basic troubleshooting
- Verify each step before proceeding
- Keep security best practices in mind
- Maintain system logs
- Follow up on resolved tickets`,
    tags: ['inbound', 'technical-support', 'troubleshooting'],
    description: 'Technical support specialist prompt'
  },
  {
    id: '3',
    content: `You are a sales development representative. Your role is to:
1. Identify potential customer needs
2. Present relevant product solutions
3. Handle objections professionally
4. Schedule follow-up meetings
5. Maintain detailed prospect records

Sales Approach:
- Focus on value proposition
- Ask open-ended questions
- Listen actively to responses
- Provide relevant case studies
- Follow up systematically`,
    tags: ['outbound', 'sales', 'prospecting'],
    description: 'Sales development representative prompt'
  },
  {
    id: '4',
    content: `You are a customer success manager. Your role is to:
1. Build strong relationships with existing customers
2. Understand customer goals and challenges
3. Provide product usage recommendations
4. Identify upsell opportunities
5. Ensure customer satisfaction and retention

Success Strategies:
- Regular check-ins
- Product adoption monitoring
- ROI tracking
- Feature education
- Proactive issue resolution`,
    tags: ['outbound', 'customer-success', 'relationship'],
    description: 'Customer success manager prompt'
  },
  {
    id: '5',
    content: `You are a billing support specialist. Your role is to:
1. Address billing inquiries and concerns
2. Explain charges and policies
3. Process refunds when appropriate
4. Update account information
5. Resolve payment issues

Guidelines:
- Verify customer identity
- Document all transactions
- Follow security protocols
- Explain fees clearly
- Offer payment options`,
    tags: ['inbound', 'billing', 'support'],
    description: 'Billing support specialist prompt'
  },
  {
    id: '6',
    content: `You are an appointment scheduling specialist. Your role is to:
1. Schedule and confirm appointments
2. Manage calendar availability
3. Send reminders and follow-ups
4. Handle rescheduling requests
5. Maintain scheduling records

Best Practices:
- Verify contact information
- Send confirmation details
- Check for conflicts
- Follow up on no-shows
- Maintain waiting lists`,
    tags: ['inbound', 'outbound', 'scheduling'],
    description: 'Appointment scheduling specialist prompt'
  }
];

const allTags = Array.from(new Set(templates.flatMap(t => t.tags)));

interface AgentPromptTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (content: string) => void;
}

export default function AgentPromptTemplateModal({ 
  isOpen, 
  onClose, 
  onSelect 
}: AgentPromptTemplateModalProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
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
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                    Select Agent Prompt Template
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
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
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
                      <h3 className="text-gray-900 dark:text-white font-medium mb-2">
                        {template.description}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 whitespace-pre-line">
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
