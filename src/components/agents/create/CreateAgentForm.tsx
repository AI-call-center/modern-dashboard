import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepSidebar from './StepSidebar';
import BasicInfoStep from './steps/BasicInfoStep';
import BehaviourStep from './steps/BehaviourStep';
import KnowledgeStep from './steps/KnowledgeStep';
import DataCollectionStep from './steps/DataCollectionStep';
import ActionsStep from './steps/ActionsStep';

export type FormData = {
  basicInfo: {
    name: string;
    voice: string;
    tone: 'professional' | 'casual' | 'talkative';
  };
  behaviour: {
    greeting: string;
    prompt: string;
    variables: Array<{ key: string; value: string }>;
  };
  knowledge: {
    llm: string;
    customKnowledge: string;
    files: Array<{ type: 'file' | 'url'; value: string }>;
  };
  dataCollection: {
    variables: Array<{ name: string; description: string }>;
  };
  actions: {
    selectedActions: string[];
  };
};

const steps = [
  { id: 'basic-info', title: 'Basic Info', icon: 'UserCircleIcon' },
  { id: 'behaviour', title: 'Behaviour', icon: 'AdjustmentsHorizontalIcon' },
  { id: 'knowledge', title: 'Knowledge', icon: 'BookOpenIcon' },
  { id: 'data-collection', title: 'Data Collection', icon: 'DocumentTextIcon' },
  { id: 'actions', title: 'Actions', icon: 'BoltIcon' },
];

export default function CreateAgentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    basicInfo: { name: '', voice: 'Christopher', tone: 'professional' },
    behaviour: { greeting: '', prompt: '', variables: [] },
    knowledge: { llm: 'GPT 4.0', customKnowledge: '', files: [] },
    dataCollection: { variables: [] },
    actions: { selectedActions: [] },
  });

  const updateFormData = (step: keyof FormData, data: any) => {
    setFormData(prev => ({ ...prev, [step]: { ...prev[step], ...data } }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your submission logic here
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoStep
            data={formData.basicInfo}
            onChange={(data) => updateFormData('basicInfo', data)}
          />
        );
      case 1:
        return (
          <BehaviourStep
            data={formData.behaviour}
            onChange={(data) => updateFormData('behaviour', data)}
          />
        );
      case 2:
        return (
          <KnowledgeStep
            data={formData.knowledge}
            onChange={(data) => updateFormData('knowledge', data)}
          />
        );
      case 3:
        return (
          <DataCollectionStep
            data={formData.dataCollection}
            onChange={(data) => updateFormData('dataCollection', data)}
          />
        );
      case 4:
        return (
          <ActionsStep
            data={formData.actions}
            onChange={(data) => updateFormData('actions', data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          <div className="flex">
            <StepSidebar steps={steps} currentStep={currentStep} />
            
            <div className="flex-1 p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {renderStep()}
                  
                  <div className="flex justify-between pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBack}
                      className={`px-6 py-2 rounded-lg text-gray-600 dark:text-gray-300 
                        hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                        ${currentStep === 0 ? 'invisible' : ''}`}
                    >
                      Back
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
                      className="px-6 py-2 bg-primary-light dark:bg-primary-dark text-white 
                        rounded-lg shadow-lg hover:shadow-xl transition-shadow
                        relative overflow-hidden"
                    >
                      <span className="relative z-10">
                        {currentStep === steps.length - 1 ? 'Create Agent' : 'Next'}
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ scale: 0, opacity: 0 }}
                        whileTap={{ scale: 2, opacity: 0.4 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
