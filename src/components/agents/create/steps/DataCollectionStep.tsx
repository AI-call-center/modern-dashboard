import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface DataCollectionStepProps {
  data: {
    variables: Array<{ name: string; type: string; description: string }>;
  };
  onChange: (data: Partial<DataCollectionStepProps['data']>) => void;
}

export default function DataCollectionStep({ data, onChange }: DataCollectionStepProps) {
  const addVariable = () => {
    onChange({
      variables: [...data.variables, { name: '', type: 'string', description: '' }],
    });
  };

  const removeVariable = (index: number) => {
    onChange({
      variables: data.variables.filter((_, i) => i !== index),
    });
  };

  const updateVariable = (index: number, field: 'name' | 'type' | 'description', value: string) => {
    const newVariables = [...data.variables];
    newVariables[index] = { ...newVariables[index], [field]: value };
    onChange({ variables: newVariables });
  };

  return (
    <div className="space-y-8">


      <div className="rounded-xl bg-gray-900/40 p-6 space-y-4">
        <div>
          <h3 className="text-xl font-medium text-white">Post call variables</h3>
          <p className="mt-1 text-gray-400 text-sm">
            Define the variables that the AI will extract from the call and trigger automation.
          </p>
        </div>

        <div className="space-y-3">
          {data.variables.map((variable, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-gray-800/50 rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-white">Variable</h4>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeVariable(index)}
                  className="text-red-500 hover:text-red-400 transition-colors"
                >
                  <TrashIcon className="h-5 w-5" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Name</label>
                    <input
                      type="text"
                      value={variable.name}
                      onChange={(e) => updateVariable(index, 'name', e.target.value)}
                      placeholder="Variable name"
                      className="w-full px-3 py-2 rounded-md
                        bg-gray-900/40 text-gray-200 placeholder-gray-500
                        border border-gray-700 focus:border-navy-400
                        focus:ring-1 focus:ring-navy-400
                        text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Type</label>
                    <select
                      value={variable.type}
                      onChange={(e) => updateVariable(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 rounded-md appearance-none
                        bg-gray-900/40 text-gray-200
                        border border-gray-700 focus:border-navy-400
                        focus:ring-1 focus:ring-navy-400
                        text-sm transition-colors"
                    >
                      <option value="string">string</option>
                      <option value="number">number</option>
                      <option value="boolean">boolean</option>
                      <option value="array">array</option>
                      <option value="object">object</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Description</label>
                  <input
                    type="text"
                    value={variable.description}
                    onChange={(e) => updateVariable(index, 'description', e.target.value)}
                    placeholder="Describe variable such that agent can understand how to"
                    className="w-full px-3 py-2 rounded-md
                      bg-gray-900/40 text-gray-200 placeholder-gray-500
                      border border-gray-700 focus:border-navy-400
                      focus:ring-1 focus:ring-navy-400
                      text-sm transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={addVariable}
          className="w-32 flex items-center justify-center space-x-2 px-4 py-2
            text-gray-200 text-sm font-medium
            bg-white/5 hover:bg-white/10
            rounded-md transition-all duration-150"
        >
          Add Row
        </motion.button>

        {data.variables.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-gray-500"
          >
            No variables added yet. Click "Add Row" to start collecting data.
          </motion.div>
        )}
      </div>
    </div>
  );
}
