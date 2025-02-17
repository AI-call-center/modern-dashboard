import { useState } from 'react';
import { motion } from 'framer-motion';
import GlowButton from '../common/GlowButton';

interface AgentBasicInfoFormProps {
  onNext: (data: any) => void;
}

export default function AgentBasicInfoForm({ onNext }: AgentBasicInfoFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    voice: 'Christopher',
    tone: 'Professional'
  });

  const [nameError, setNameError] = useState(false);

  const handleNext = () => {
    if (!formData.name) {
      setNameError(true);
      return;
    }
    onNext(formData);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Basic Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Let's start with the fundamental details of your AI agent
        </p>
      </div>

      {/* Agent Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Agent Name
        </label>
        <input
          type="text"
          placeholder="Ex: John Doe"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            setNameError(false);
          }}
          className={`w-full px-4 py-2 rounded-lg
            bg-white/80 dark:bg-gray-800/80
            border ${nameError ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}
            focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark
            focus:border-transparent
            backdrop-blur-sm
            transition-all duration-200`}
        />
        {nameError && (
          <p className="text-sm text-red-500">Name is required</p>
        )}
      </div>

      {/* Voice Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Voice
        </label>
        <div className="flex items-center space-x-4">
          <select
            value={formData.voice}
            onChange={(e) => setFormData({ ...formData, voice: e.target.value })}
            className="flex-1 px-4 py-2 rounded-lg
              bg-white/80 dark:bg-gray-800/80
              border border-gray-200 dark:border-gray-700
              focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark
              focus:border-transparent
              backdrop-blur-sm
              transition-all duration-200"
          >
            <option value="Christopher">Christopher</option>
            <option value="Emma">Emma</option>
            <option value="James">James</option>
          </select>
          <GlowButton
            type="secondary"
            size="sm"
            onClick={() => {/* Clone voice logic */}}
          >
            Clone Voice
          </GlowButton>
        </div>
      </div>

      {/* Tone Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tone
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Professional', 'Casual', 'Talkative'].map((tone) => (
            <button
              key={tone}
              onClick={() => setFormData({ ...formData, tone })}
              className={`p-4 rounded-lg text-left transition-all duration-200
                ${formData.tone === tone
                  ? 'bg-primary-light/10 dark:bg-primary-dark/10 border-primary-light dark:border-primary-dark'
                  : 'bg-white/80 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700'
                }
                border backdrop-blur-sm
                hover:bg-primary-light/5 dark:hover:bg-primary-dark/5`}
            >
              <h3 className="font-medium text-gray-900 dark:text-white">
                {tone}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tone === 'Professional' && 'Formal and business-oriented communication style'}
                {tone === 'Casual' && 'Friendly and conversational tone'}
                {tone === 'Talkative' && 'Engaging and chatty personality'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-6 space-x-4">
        <GlowButton
          type="primary"
          onClick={handleNext}
          size="lg"
        >
          Next
        </GlowButton>
      </div>
    </div>
  );
}
