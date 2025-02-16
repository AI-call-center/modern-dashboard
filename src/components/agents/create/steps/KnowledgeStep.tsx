import { motion } from 'framer-motion';
import { PlusIcon, TrashIcon, DocumentIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

interface KnowledgeStepProps {
  data: {
    llm: string;
    customKnowledge: string;
    files: Array<{ type: 'file' | 'url'; value: string }>;
  };
  onChange: (data: Partial<KnowledgeStepProps['data']>) => void;
}

const llmOptions = [
  'GPT 4.0',
  'GPT 3.5 Turbo',
  'Claude 2.0',
  'PaLM 2.0',
];

export default function KnowledgeStep({ data, onChange }: KnowledgeStepProps) {
  const addFile = (type: 'file' | 'url') => {
    onChange({
      files: [...data.files, { type, value: '' }],
    });
  };

  const removeFile = (index: number) => {
    onChange({
      files: data.files.filter((_, i) => i !== index),
    });
  };

  const updateFile = (index: number, value: string) => {
    const newFiles = [...data.files];
    newFiles[index] = { ...newFiles[index], value };
    onChange({ files: newFiles });
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
          Knowledge Base
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Configure your agent's knowledge sources and capabilities
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* LLM Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Language Model
          </label>
          <select
            value={data.llm}
            onChange={(e) => onChange({ llm: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
          >
            {llmOptions.map((llm) => (
              <option key={llm} value={llm}>
                {llm}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Knowledge */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Custom Knowledge
          </label>
          <textarea
            value={data.customKnowledge}
            onChange={(e) => onChange({ customKnowledge: e.target.value })}
            placeholder="Add any specific knowledge or context for your agent..."
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent
              placeholder-gray-400 dark:placeholder-gray-500"
          />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            This will be used to help your agent answer questions more accurately.
          </p>
        </div>

        {/* Knowledge Files */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Knowledge Files
            </label>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addFile('file')}
                className="flex items-center space-x-2 px-4 py-2 text-sm
                  bg-primary-light/10 dark:bg-primary-dark/10 
                  text-primary-light dark:text-primary-dark rounded-lg
                  hover:bg-primary-light/20 dark:hover:bg-primary-dark/20
                  transition-colors"
              >
                <DocumentIcon className="h-4 w-4" />
                <span>Add File</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addFile('url')}
                className="flex items-center space-x-2 px-4 py-2 text-sm
                  bg-primary-light/10 dark:bg-primary-dark/10 
                  text-primary-light dark:text-primary-dark rounded-lg
                  hover:bg-primary-light/20 dark:hover:bg-primary-dark/20
                  transition-colors"
              >
                <GlobeAltIcon className="h-4 w-4" />
                <span>Add URL</span>
              </motion.button>
            </div>
          </div>

          <div className="space-y-3">
            {data.files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex space-x-4"
              >
                <div className="flex-none flex items-center px-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  {file.type === 'file' ? (
                    <DocumentIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <GlobeAltIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  )}
                </div>
                <input
                  type={file.type === 'url' ? 'url' : 'text'}
                  value={file.value}
                  onChange={(e) => updateFile(index, e.target.value)}
                  placeholder={file.type === 'url' ? 'Enter URL' : 'Select file'}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                    focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFile(index)}
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
