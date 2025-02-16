import { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import VoiceCloneModal from './VoiceCloneModal';

interface BasicInfoStepProps {
  onNext: () => void;
}

export default function BasicInfoStep({ onNext }: BasicInfoStepProps) {
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [hasVoiceClone, setHasVoiceClone] = useState(false);
  const [name, setName] = useState('');
  const [selectedTone, setSelectedTone] = useState('professional');

  const handleVoiceComplete = (voiceData: any) => {
    // TODO: Handle the voice data (either recorded or uploaded)
    setHasVoiceClone(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Basic Information</h2>
          <p className="text-gray-400">Let's start with the fundamental details of your AI agent</p>
        </div>
        <button onClick={() => {}} className="text-gray-400 hover:text-white">
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
      
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Agent Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: John Doe"
          />
          {name === '' && (
            <p className="mt-2 text-sm text-red-500">
              <span className="mr-2">⚠</span>
              Name is required
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Voice
          </label>
          <div className="flex items-center">
            <input
              type="text"
              value="Christopher"
              readOnly
              className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
            />
            <button
              onClick={() => setShowVoiceModal(true)}
              className="ml-4 px-4 py-2 bg-transparent border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-colors"
            >
              Clone Voice
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-4">
            Tone
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                id: 'professional',
                title: 'Professional',
                description: 'Formal and business-oriented communication style'
              },
              {
                id: 'casual',
                title: 'Casual',
                description: 'Friendly and conversational tone'
              },
              {
                id: 'talkative',
                title: 'Talkative',
                description: 'Engaging and chatty personality'
              }
            ].map((tone) => (
              <button
                key={tone.id}
                onClick={() => setSelectedTone(tone.id)}
                className={`p-4 rounded-lg text-left transition-colors ${selectedTone === tone.id
                  ? 'bg-blue-500/20 border-2 border-blue-500'
                  : 'bg-gray-800 border border-gray-700 hover:border-gray-600'}`}
              >
                <h3 className="font-medium text-white mb-1">{tone.title}</h3>
                <p className="text-sm text-gray-400">{tone.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
          >
            Next
          </motion.button>
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
