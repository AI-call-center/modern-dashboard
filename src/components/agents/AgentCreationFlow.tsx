import { useState } from 'react';
import { motion } from 'framer-motion';
import GlowButton from '../common/GlowButton';

interface AgentCreationFlowProps {
  onComplete: (agentData: any) => void;
  onCancel: () => void;
}

const steps = ['Basic Info', 'Capabilities', 'Review'];

export default function AgentCreationFlow({ onComplete, onCancel }: AgentCreationFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capabilities: [],
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onCancel();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Progress Steps */}
      <div className="flex justify-center space-x-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex items-center ${
              index !== steps.length - 1 ? 'flex-1' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center
                ${
                  index <= currentStep
                    ? 'bg-primary-light/90 dark:bg-primary-dark/90 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }
              `}
            >
              {index + 1}
            </div>
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2
                  ${
                    index < currentStep
                      ? 'bg-primary-light dark:bg-primary-dark'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }
                `}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="min-h-[300px] p-6 rounded-lg
        bg-white/80 dark:bg-gray-800/80
        backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50
        shadow-xl shadow-gray-200/20 dark:shadow-gray-900/30"
      >
        {/* Step content here */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Basic Information</h3>
            {/* Basic info form fields */}
          </div>
        )}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Agent Capabilities</h3>
            {/* Capabilities form fields */}
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Review</h3>
            {/* Review content */}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <GlowButton
          type="secondary"
          onClick={handleBack}
        >
          {currentStep === 0 ? 'Cancel' : 'Back'}
        </GlowButton>

        <div className="space-x-4">
          {currentStep === steps.length - 1 && (
            <GlowButton
              type="danger"
              onClick={onCancel}
            >
              Cancel
            </GlowButton>
          )}
          <GlowButton
            type="primary"
            onClick={handleNext}
          >
            {currentStep === steps.length - 1 ? 'Create Agent' : 'Next'}
          </GlowButton>
        </div>
      </div>
    </motion.div>
  );
}
