import { useState } from 'react';
import { motion } from 'framer-motion';
import TemplateCard from '../components/templates/TemplateCard';
import CreateAgentCard from '../components/templates/CreateAgentCard';
import SearchFilters from '../components/templates/SearchFilters';

interface Template {
  id: string;
  type: 'custom' | 'health-care' | 'retail' | 'education' | 'real-estate' | 'corporate' | 'laboratory';
  title: string;
  description: string;
}

const templates: Template[] = [
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

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<Template['type'] | ''>('');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            AI Agent Templates
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Choose from our pre-built templates or create your own custom AI agent
          </p>
        </motion.div>

        <div className="relative">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-navy-800 text-white border-none
                placeholder-gray-400 focus:ring-2 focus:ring-primary-light focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTemplates.map((template) => (
            <motion.div
              key={template.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <TemplateCard
                type={template.type}
                title={template.title}
                description={template.description}
                onClick={() => {
                  // Handle template selection
                  console.log('Selected template:', template.title);
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
