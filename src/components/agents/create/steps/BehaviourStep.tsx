import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface BehaviourStepProps {
  data: {
    greeting: string;
    prompt: string;
    variables: Array<{ key: string; value: string }>;
  };
  onChange: (data: Partial<BehaviourStepProps['data']>) => void;
}

export default function BehaviourStep({ data, onChange }: BehaviourStepProps) {
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
              className="text-sm text-primary-light dark:text-primary-dark 
                hover:text-opacity-80 transition-colors flex items-center space-x-1"
            >
              <span>Browse Templates</span>
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.1 }}
                transition={{ duration: 0.2 }}
              />
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Agent Prompt
          </label>
          <textarea
            value={data.prompt}
            onChange={(e) => onChange({ prompt: e.target.value })}
            placeholder="Ex: You are a helpful assistant that can help the user with their questions..."
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent
              placeholder-gray-400 dark:placeholder-gray-500"
          />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Give more information about your agent to help it understand the user's context.
          </p>
        </div>

        {/* Call Variables */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Call Variables
            </label>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addVariable}
              className="flex items-center space-x-2 px-4 py-2 text-sm
                bg-primary-light/10 dark:bg-primary-dark/10 
                text-primary-light dark:text-primary-dark rounded-lg
                hover:bg-primary-light/20 dark:hover:bg-primary-dark/20
                transition-colors"
            >
              <PlusIcon className="h-4 w-4" />
              <span>Add Row</span>
            </motion.button>
          </div>

          <div className="space-y-3">
            {data.variables.map((variable, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex space-x-4"
              >
                <input
                  type="text"
                  value={variable.key}
                  onChange={(e) => updateVariable(index, 'key', e.target.value)}
                  placeholder="Key"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
                />
                <input
                  type="text"
                  value={variable.value}
                  onChange={(e) => updateVariable(index, 'value', e.target.value)}
                  placeholder="Value"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeVariable(index)}
                  className="p-2 text-red-500 hover:text-red-600 
                    dark:text-red-400 dark:hover:text-red-300"
                >
                  <TrashIcon className="h-5 w-5" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
