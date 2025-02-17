import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import GreetingTemplateModal from '../../../templates/GreetingTemplateModal';
import AgentPromptTemplateModal from '../../../templates/AgentPromptTemplateModal';

interface BehaviourStepProps {
  data: {
    greeting: string;
    prompt: string;
    variables: Array<{ key: string; value: string }>;
  };
  onChange: (data: Partial<BehaviourStepProps['data']>) => void;
}

export default function BehaviourStep({ data, onChange }: BehaviourStepProps) {
  const [isGreetingModalOpen, setIsGreetingModalOpen] = useState(false);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);


  const addVariable = () => {
    onChange({
      variables: [...data.variables, { key: '', value: '' }],
    });
  };

  const removeVariable = (index: number) => {
    onChange({
      variables: data.variables.filter((_, i) => i !== index),
    });
  };

  const updateVariable = (index: number, field: 'key' | 'value', value: string) => {
    const newVariables = [...data.variables];
    newVariables[index] = { ...newVariables[index], [field]: value };
    onChange({ variables: newVariables });
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
          Behaviour Configuration
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Define how your AI agent interacts with users
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Greeting */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Greeting (Incoming)
            </label>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsGreetingModalOpen(true)}
              className="text-sm text-gray-700 dark:text-gray-200
                hover:text-navy-700 dark:hover:text-navy-400 transition-colors flex items-center space-x-1"
            >
              <span>Browse Templates</span>
            </motion.button>
          </div>
          <div className="relative">
            <textarea
              value={data.greeting}
              onChange={(e) => onChange({ greeting: e.target.value })}
              placeholder="Ex: Hello, how can I help you today?"
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent
                placeholder-gray-400 dark:placeholder-gray-500"
            />
            {!data.greeting && (
              <div className="absolute top-2 right-2">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500 animate-pulse" />
              </div>
            )}
          </div>
          {!data.greeting && (
            <p className="mt-1 text-sm text-red-500 flex items-center">
              <ExclamationCircleIcon className="h-4 w-4 mr-1" />
              Greeting is required
            </p>
          )}
        </div>

        {/* Agent Prompt */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Agent Prompt
            </label>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsPromptModalOpen(true)}
              className="text-sm text-gray-700 dark:text-gray-200
                hover:text-navy-700 dark:hover:text-navy-400 transition-colors flex items-center space-x-1"
            >
              <span>Browse Templates</span>
            </motion.button>
          </div>
          <div className="relative mt-1">
            <textarea
              value={data.prompt}
              onChange={(e) => {
                const textarea = e.target;
                // Reset height to auto to properly calculate new height
                textarea.style.height = '0px';
                // Set new height based on scrollHeight with padding
                const newHeight = textarea.scrollHeight;
                textarea.style.height = `${newHeight}px`;
                onChange({ prompt: textarea.value });
              }}
              onInput={(e) => {
                const textarea = e.target as HTMLTextAreaElement;
                textarea.style.height = '0px';
                const newHeight = textarea.scrollHeight;
                textarea.style.height = `${newHeight}px`;
              }}
              placeholder="Ex: You are a helpful assistant that can help the user with their questions..."
              className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent
                placeholder-gray-400 dark:placeholder-gray-500
                min-h-[120px] overflow-hidden resize-none
                whitespace-pre-wrap font-mono text-sm leading-relaxed
                p-4"
              style={{ height: 'auto' }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Give more information about your agent to help it understand the user's context.
          </p>
        </div>

        {/* Call Variables */}
        <div className="rounded-lg overflow-hidden">
          <div className="bg-gray-800/50 p-4 space-y-2">
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-medium text-white flex items-center space-x-2">
                <span className="i-heroicons-squares-2x2-20-solid text-yellow-400" />
                <span>Call variables</span>
              </h3>
            </div>
            <p className="text-sm text-gray-400">
              Define variables that can be passed <span className="text-yellow-400">before</span> making the call and used in
              the prompt like <span className="text-yellow-400">{'{variable_name}'}</span>.
            </p>
          </div>

          <div className="bg-gray-900/40">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left py-2 px-4 text-sm font-medium text-gray-400">Variable name</th>
                  <th className="text-left py-2 px-4 text-sm font-medium text-gray-400">Default value</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {data.variables.map((variable, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="border-b border-gray-700/50 last:border-0"
                  >
                    <td className="p-2">
                      <input
                        type="text"
                        value={variable.key}
                        onChange={(e) => updateVariable(index, 'key', e.target.value)}
                        placeholder="Ex: customer_name"
                        className="w-full px-3 py-2 rounded-md
                          bg-gray-800 text-gray-200 placeholder-gray-500
                          border border-gray-700 focus:border-navy-400
                          focus:ring-1 focus:ring-navy-400
                          text-sm transition-colors"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={variable.value}
                        onChange={(e) => updateVariable(index, 'value', e.target.value)}
                        placeholder="Ex: John"
                        className="w-full px-3 py-2 rounded-md
                          bg-gray-800 text-gray-200 placeholder-gray-500
                          border border-gray-700 focus:border-navy-400
                          focus:ring-1 focus:ring-navy-400
                          text-sm transition-colors"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeVariable(index)}
                        className="p-1 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
                <tr>
                  <td colSpan={3} className="p-2">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={addVariable}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2
                        text-gray-400 hover:text-white text-sm
                        bg-gray-800/50 hover:bg-gray-800 
                        border border-gray-700 rounded-md
                        transition-all duration-150"
                    >
                      <PlusIcon className="h-4 w-4" />
                      <span>Add variable</span>
                    </motion.button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <GreetingTemplateModal
        isOpen={isGreetingModalOpen}
        onClose={() => setIsGreetingModalOpen(false)}
        onSelect={(content) => onChange({ greeting: content })}
      />
      <AgentPromptTemplateModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        onSelect={(content) => onChange({ prompt: content })}
      />
    </div>
  );
}
