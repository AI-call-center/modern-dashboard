import { useState } from 'react';
import { motion } from 'framer-motion';
import TemplateCard from '../components/templates/TemplateCard';
import CreateAgentCard from '../components/templates/CreateAgentCard';
import SearchFilters from '../components/templates/SearchFilters';

const templates = [
  {
    id: 1,
    title: 'Restaurant Staff',
    description: 'Professional, courteous assistant for scheduling and inquiries related to restaurant operations.',
    inboundUseCase: 'Handle reservation requests and general inquiries',
    outboundUseCase: 'Confirm reservations and send follow-up communications',
    industry: 'restaurant',
  },
  {
    id: 2,
    title: 'Healthcare Practice',
    description: 'Professional, courteous assistant for scheduling and inquiries related to medical appointments.',
    inboundUseCase: 'Schedule appointments and handle patient inquiries',
    outboundUseCase: 'Send appointment reminders and follow-up calls',
    industry: 'healthcare',
  },
  {
    id: 3,
    title: 'Home Care',
    description: 'Professional, courteous assistant for scheduling and inquiries related to home care services.',
    inboundUseCase: 'Handle service requests and scheduling',
    outboundUseCase: 'Conduct follow-up calls and satisfaction surveys',
    industry: 'homecare',
  },
  {
    id: 4,
    title: 'Hotel',
    description: 'Professional, courteous assistant for scheduling and inquiries related to hotel bookings.',
    inboundUseCase: 'Handle booking requests and guest inquiries',
    outboundUseCase: 'Send booking confirmations and pre-arrival communications',
    industry: 'hotel',
  },
  {
    id: 5,
    title: 'E-commerce',
    description: 'Professional, courteous assistant for order inquiries and customer support.',
    inboundUseCase: 'Handle order inquiries and product questions',
    outboundUseCase: 'Collect customer feedback and send order updates',
    industry: 'ecommerce',
  },
  {
    id: 6,
    title: 'Customer Support',
    description: 'Professional, courteous assistant for customer inquiries and issue resolution.',
    inboundUseCase: 'Handle customer support requests and troubleshooting',
    outboundUseCase: 'Conduct follow-up calls and resolution confirmation',
    industry: 'support',
  },
];

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    useCase: '',
    complexity: '',
  });

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesIndustry = !filters.industry || template.industry === filters.industry;
    
    return matchesSearch && matchesIndustry;
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI Agent Templates
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Choose from our pre-built templates or create your own custom AI agent
        </p>
      </motion.div>

      <div className="mb-8">
        <SearchFilters
          onSearch={setSearchQuery}
          onFilterChange={setFilters}
        />
      </div>

      <div className="mb-12">
        <CreateAgentCard />
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
              title={template.title}
              description={template.description}
              inboundUseCase={template.inboundUseCase}
              outboundUseCase={template.outboundUseCase}
              onSelect={() => {
                // Handle template selection
                console.log('Selected template:', template.title);
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
