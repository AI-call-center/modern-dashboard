import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import VoiceCloneModal from '../VoiceCloneModal';

interface BasicInfoStepProps {
  data: {
    name: string;
    voice: string;
    tone: 'professional' | 'casual' | 'talkative';
  };
  onChange: (data: Partial<BasicInfoStepProps['data']>) => void;
}

const toneOptions = [
  {
    id: 'professional',
    title: 'Professional',
    description: 'Formal and business-oriented communication style',
  },
  {
    id: 'casual',
    title: 'Casual',
    description: 'Friendly and conversational tone',
  },
  {
    id: 'talkative',
    title: 'Talkative',
    description: 'Engaging and chatty personality',
  },
];

const voiceOptions = [
  'Christopher',
  'Emma',
  'Michael',
  'Sarah',
  'David',
  'Lisa',
];

export default function BasicInfoStep({ data, onChange }: BasicInfoStepProps) {
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [hasVoiceClone, setHasVoiceClone] = useState(false);

  const handleVoiceComplete = (voiceData: any) => {
    setHasVoiceClone(true);
    onChange({ voice: 'Christopher (Cloned)' });
    setShowVoiceModal(false);
  };
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-clip-text text-transparent 
          bg-gradient-to-r from-primary-light to-blue-600 dark:from-primary-dark dark:to-blue-400
          [text-shadow:_0_0_30px_rgb(var(--primary-light-rgb)_/_0.3)]"
        >
          Basic Information
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Let's start with the fundamental details of your AI agent
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Agent Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="Ex: John Doe"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent
                placeholder-gray-400 dark:placeholder-gray-500"
            />
            {!data.name && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500 animate-pulse" />
              </div>
            )}
          </div>
          {!data.name && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <ExclamationCircleIcon className="h-4 w-4 mr-1" />
              Name is required
            </p>
          )}
        </div>

        {/* Voice Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Voice
          </label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={data.voice}
              readOnly
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
            />
            <button
              onClick={() => setShowVoiceModal(true)}
              className="px-4 py-2 bg-transparent border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-colors"
            >
              Clone Voice
            </button>
          </div>
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Tone
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {toneOptions.map((tone) => (
              <motion.div
                key={tone.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChange({ tone: tone.id as BasicInfoStepProps['data']['tone'] })}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-colors
                  ${
                    data.tone === tone.id
                      ? 'border-primary-light dark:border-primary-dark bg-primary-light/5 dark:bg-primary-dark/5'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  {tone.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {tone.description}
                </p>
                {data.tone === tone.id && (
                  <motion.div
                    layoutId="tone-glow"
                    className="absolute inset-0 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      background: `radial-gradient(circle, rgb(var(--primary-light-rgb) / 0.2) 0%, transparent 70%)`,
                      zIndex: -1,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <VoiceCloneModal
        isOpen={showVoiceModal}
        onClose={() => setShowVoiceModal(false)}
        onComplete={handleVoiceComplete}
      />
    </div>
  );
}
