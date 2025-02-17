import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepSidebar from './StepSidebar';
import BasicInfoStep from './steps/BasicInfoStep';
import BehaviourStep from './steps/BehaviourStep';
import KnowledgeStep from './steps/KnowledgeStep';
import DataCollectionStep from './steps/DataCollectionStep';
import ToolsStep from './steps/ToolsStep';
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
  tools: {
    tools: Array<{
      id: string;
      name: string;
      description: string;
      enabled: boolean;
      config: { [key: string]: any };
    }>;
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
  { id: 'tools', title: 'Tools', icon: 'WrenchScrewdriverIcon' },
  { id: 'actions', title: 'Actions', icon: 'BoltIcon' },
];

export default function CreateAgentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showStep, setShowStep] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    basicInfo: { name: '', voice: 'Christopher', tone: 'professional' },
    behaviour: { greeting: '', prompt: '', variables: [] },
    knowledge: { llm: 'GPT 4.0', customKnowledge: '', files: [] },
    dataCollection: { variables: [] },
    tools: {
      tools: [
        {
          id: 'end-call',
          name: 'End Call',
          description: 'Ends the call.',
          enabled: false,
          config: {
            whenToEnd: 'End the call after saying goodbye to the customer.'
          }
        },
        {
          id: 'appointment',
          name: 'Appointment Scheduling',
          description: 'Real-time booking scheduling.',
          enabled: false,
          config: {
            calendarService: 'Google Calendar'
          }
        },
        {
          id: 'transfer',
          name: 'Call Transfer',
          description: 'Transfers the call to a real assistant.',
          enabled: false,
          config: {
            countryCode: '+1',
            phoneNumber: '',
            whenToTransfer: 'Transfer the call when the customer asks for a real assistant.'
          }
        }
      ]
    },
    actions: { selectedActions: [] },
  });

  const updateFormData = (step: keyof FormData, data: any) => {
    setFormData(prev => ({ ...prev, [step]: { ...prev[step], ...data } }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setShowStep(false);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setShowStep(true);
      }, 200);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setShowStep(false);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setShowStep(true);
      }, 200);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your submission logic here
  };

  const renderStep = () => {
    const StepComponent = (() => {
      switch (currentStep) {
        case 0:
          return BasicInfoStep;
        case 1:
          return BehaviourStep;
        case 2:
          return KnowledgeStep;
        case 3:
          return DataCollectionStep;
        case 4:
          return ToolsStep;
        case 5:
          return ActionsStep;
        default:
          return BasicInfoStep;
      }
    })();

    return (
      <AnimatePresence mode="wait">
        {showStep && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            <StepComponent
              data={formData[Object.keys(formData)[currentStep] as keyof FormData]}
              onChange={(data) => updateFormData(Object.keys(formData)[currentStep] as keyof FormData, data)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="flex h-full bg-white dark:bg-gray-900">
      <StepSidebar
        steps={steps}
        currentStep={currentStep}
        onStepClick={(step) => {
          setShowStep(false);
          setTimeout(() => {
            setCurrentStep(step);
            setShowStep(true);
          }, 200);
        }}
      />
      <div className="flex-1">
        <div className="h-full flex flex-col">
          <div className="flex-1 px-8 py-6">
            {renderStep()}
          </div>
          <div className="px-8 py-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBack}
                className={`px-6 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300
                  hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${currentStep === 0 ? 'invisible' : ''}`}
              >
                Back
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
                className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
              >
                {currentStep === steps.length - 1 ? 'Create Agent' : 'Next'}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
