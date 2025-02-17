import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  AdjustmentsHorizontalIcon,
  BookOpenIcon,
  DocumentTextIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

const icons = {
  UserCircleIcon,
  AdjustmentsHorizontalIcon,
  BookOpenIcon,
  DocumentTextIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
};

interface StepSidebarProps {
  steps: Array<{
    id: string;
    title: string;
    icon: keyof typeof icons;
  }>;
  currentStep: number;
}

export default function StepSidebar({ steps, currentStep }: StepSidebarProps) {
  return (
    <div className="w-72 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-6">
      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = icons[step.icon];
          const isActive = index === currentStep;
          const isPast = index < currentStep;

          return (
            <div
              key={step.id}
              className={`relative flex items-center ${
                index !== steps.length - 1 ? 'pb-8' : ''
              }`}
            >
              {/* Connecting line */}
              {index !== steps.length - 1 && (
                <div
                  className={`absolute left-5 top-8 w-0.5 h-full ${
                    isPast ? 'bg-primary-light dark:bg-primary-dark' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}

              {/* Step indicator */}
              <motion.div
                animate={isActive ? 'active' : 'inactive'}
                variants={{
                  active: {
                    scale: 1.1,
                    boxShadow: '0 0 15px rgba(var(--primary-light-rgb), 0.5)',
                  },
                  inactive: {
                    scale: 1,
                    boxShadow: 'none',
                  },
                }}
                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full 
                  ${
                    isActive
                      ? 'bg-primary-light dark:bg-primary-dark text-white'
                      : isPast
                      ? 'bg-primary-light/20 dark:bg-primary-dark/20 text-primary-light dark:text-primary-dark'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary-light dark:bg-primary-dark"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ zIndex: -1 }}
                  />
                )}
              </motion.div>

              {/* Step text */}
              <div className="ml-4">
                <p
                  className={`text-sm font-medium ${
                    isActive
                      ? 'text-primary-light dark:text-primary-dark'
                      : isPast
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
