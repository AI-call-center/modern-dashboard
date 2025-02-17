import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';

export default function CreateAgentCard() {
  return (
    <motion.div
      className="bg-gradient-to-br from-primary-light to-blue-600 dark:from-primary-dark dark:to-blue-800 
                 rounded-xl shadow-lg overflow-hidden text-white p-6"
      whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{ transform: 'skewX(-20deg) translateX(-100%)' }}
      />

      <div className="relative">
        <h2 className="text-2xl font-bold mb-3">Create Your Own AI Agent</h2>
        <p className="text-white/90 mb-6">
          Create your own AI agent from scratch, tailored to your business, your products, 
          your knowledge, your goals, etc.
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center px-6 py-3 bg-white text-primary-light dark:text-primary-dark 
                   rounded-lg font-medium transition-shadow hover:shadow-lg focus:outline-none 
                   focus:ring-2 focus:ring-white focus:ring-opacity-50"
        >
          <SparklesIcon className="w-5 h-5 mr-2" />
          Get Started
        </motion.button>
      </div>
    </motion.div>
  );
}
