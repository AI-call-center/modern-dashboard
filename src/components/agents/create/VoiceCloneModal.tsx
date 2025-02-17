import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MicrophoneIcon, ArrowPathIcon, CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface VoiceCloneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (voiceData: any) => void;
}

export default function VoiceCloneModal({ isOpen, onClose, onComplete }: VoiceCloneModalProps) {
  const [step, setStep] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [voiceName, setVoiceName] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 30) {
            setIsRecording(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const sampleScript = `
    Hello! I'm recording this sample to create a digital clone of my voice.
    This will help me generate more natural and engaging responses for our users.
    I'm excited to see how this technology can enhance our communication capabilities.
  `;

  const handleStartRecording = () => {
    setIsRecording(true);
    // TODO: Implement actual recording logic
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // TODO: Stop recording and save audio blob
  };

  const handleRestart = () => {
    setRecordingTime(0);
    setAudioBlob(null);
    setIsRecording(false);
  };

  const handleFinish = () => {
    if (audioBlob && voiceName) {
      onComplete({ audioBlob, name: voiceName });
      setVoiceName('');
    }
    onClose();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && voiceName) {
      // TODO: Handle file upload
      onComplete({ file, name: voiceName });
      setVoiceName('');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl p-8 bg-white dark:bg-gray-900/95 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800"
          >
            {step === 1 ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Clone Your Voice</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Choose how you'd like to provide your voice sample. You can either record directly or upload an audio file.
                </p>
                <div className="mb-8">
                  <input
                    type="text"
                    value={voiceName}
                    onChange={(e) => setVoiceName(e.target.value)}
                    placeholder="Enter a name for your voice clone"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  {voiceName === '' && (
                    <p className="mt-2 text-sm text-red-500 text-left">
                      <span className="mr-2">⚠</span>
                      Name is required for voice clone
                    </p>
                  )}
                </div>
                <div className="flex justify-center space-x-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => voiceName ? setStep(2) : null}
                    className={`flex flex-col items-center p-6 rounded-xl border transition-colors group ${voiceName ? 'bg-cyan-50 dark:bg-cyan-600/20 border-cyan-200 dark:border-cyan-500/30 hover:bg-cyan-100 dark:hover:bg-cyan-600/30' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-not-allowed'}`}
                  >
                    <MicrophoneIcon className="w-12 h-12 text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300" />
                    <span className="mt-4 text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300">Record Your Voice</span>
                  </motion.button>
                  <label>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex flex-col items-center p-6 rounded-xl border transition-colors cursor-pointer group ${voiceName ? 'bg-purple-50 dark:bg-purple-600/20 border-purple-200 dark:border-purple-500/30 hover:bg-purple-100 dark:hover:bg-purple-600/30' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 cursor-not-allowed'}`}
                    >
                      <CloudArrowUpIcon className="w-12 h-12 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300" />
                      <span className="mt-4 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300">Upload Audio File</span>
                    </motion.div>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Create Voice Clone</h2>
                
                {/* Waveform Animation */}
                <div className="h-32 mb-8 bg-gray-800 rounded-lg overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isRecording ? {
                      opacity: [0.5, 1],
                      scaleY: [0.5, 1.5],
                    } : { opacity: 0 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "easeInOut"
                    }}
                    className="h-full w-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"
                  />
                </div>

                {/* Timer and Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-center space-x-2 text-xl text-white mb-4">
                    {isRecording && (
                      <motion.div
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-3 h-3 rounded-full bg-red-500"
                      />
                    )}
                    <span>{formatTime(recordingTime)} / 0:30</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(recordingTime / 30) * 100}%` }}
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                    />
                  </div>
                </div>

                {/* Script */}
                <div className="mb-8">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className="text-2xl">💡</span>
                    <span className="text-gray-300">Read this script for best results</span>
                  </div>
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <p className="text-gray-300 text-left">{sampleScript}</p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRestart}
                    className="p-4 rounded-full bg-black border border-green-500/30 text-green-400 hover:bg-green-900/20 transition-colors"
                  >
                    <ArrowPathIcon className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isRecording ? handleStopRecording : handleStartRecording}
                    className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                      isRecording
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </motion.button>
                  {!isRecording && recordingTime > 0 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleFinish}
                      className="px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors"
                    >
                      Finish
                    </motion.button>
                  )}
                </div>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
