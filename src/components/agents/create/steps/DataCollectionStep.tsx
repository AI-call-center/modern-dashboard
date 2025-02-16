import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface DataCollectionStepProps {
  data: {
    variables: Array<{ name: string; description: string }>;
  };
  onChange: (data: Partial<DataCollectionStepProps['data']>) => void;
}

export default function DataCollectionStep({ data, onChange }: DataCollectionStepProps) {
  const addVariable = () => {
    onChange({
      variables: [...data.variables, { name: '', description: '' }],
    });
  };

  const removeVariable = (index: number) => {
    onChange({
      variables: data.variables.filter((_, i) => i !== index),
    });
  };

  const updateVariable = (index: number, field: 'name' | 'description', value: string) => {
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
          Data Collection
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Configure the data points to collect during agent interactions
        </p>
      </motion.div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Post Call Variables
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
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={variable.name}
                  onChange={(e) => updateVariable(index, 'name', e.target.value)}
                  placeholder="Variable Name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
                />
                {!variable.name && (
                  <p className="text-sm text-red-500 flex items-center">
                    <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                    Name is required
                  </p>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={variable.description}
                  onChange={(e) => updateVariable(index, 'description', e.target.value)}
                  placeholder="Description"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
                />
              </div>
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

        {data.variables.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-500 dark:text-gray-400"
          >
            No variables added yet. Click "Add Row" to start collecting data.
          </motion.div>
        )}
      </div>
    </div>
  );
}
