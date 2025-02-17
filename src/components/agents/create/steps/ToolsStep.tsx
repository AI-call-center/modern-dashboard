import React from 'react';
import { motion } from 'framer-motion';
import { Switch } from '@headlessui/react';
import { ChevronDownIcon, PencilIcon } from '@heroicons/react/24/outline';

interface Tool {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  config: {
    [key: string]: any;
  };
}

interface ToolsStepProps {
  data: {
    tools: Tool[];
  };
  onChange: (data: Partial<ToolsStepProps['data']>) => void;
}

const defaultTools: Tool[] = [
  {
    id: 'end-call',
    name: 'End Call',
    description: 'Ends the call.',
    enabled: false,
    config: {
      whenToEnd: 'End the call after saying goodbye to the customer.'
    }
  },
  {
    id: 'appointment',
    name: 'Appointment Scheduling',
    description: 'Real-time booking scheduling.',
    enabled: false,
    config: {
      calendarService: 'Google Calendar',
      apiKey: '',
      calendarId: '',
      integrationSettings: {
        'Google Calendar': {
          apiKey: '',
          calendarId: ''
        },
        'Cal.com': {
          apiKey: ''
        },
        'Calendly': {
          apiKey: ''
        }
      }
    }
  },
  {
    id: 'transfer',
    name: 'Call Transfer',
    description: 'Transfers the call to a real assistant.',
    enabled: false,
    config: {
      countryCode: '+1',
      phoneNumber: '',
      whenToTransfer: 'Transfer the call when the customer asks for a real assistant.'
    }
  }
];

const calendarServices = [
  'Google Calendar',
  'Cal.com',
  'Calendly'
];

const countryCodes = [
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+91', country: 'India' }
];

export default function ToolsStep({ data, onChange }: ToolsStepProps) {
  // Initialize integration settings if they don't exist
  const initializeSettings = () => {
    if (!data.tools.find(t => t.id === 'appointment')?.config.integrationSettings) {
      const appointmentTool = data.tools.find(t => t.id === 'appointment');
      if (appointmentTool) {
        updateTool('appointment', {
          config: {
            ...appointmentTool.config,
            integrationSettings: {
              'Google Calendar': {
                apiKey: '',
                calendarId: ''
              },
              'Cal.com': {
                apiKey: ''
              },
              'Calendly': {
                apiKey: ''
              }
            }
          }
        });
      }
    }
  };

  // Call initialization on mount
  React.useEffect(() => {
    initializeSettings();
  }, []);
  const updateTool = (toolId: string, updates: Partial<Tool>) => {
    const newTools = data.tools.map(tool => 
      tool.id === toolId ? { ...tool, ...updates } : tool
    );
    onChange({ tools: newTools });
  };

  const updateToolConfig = (toolId: string, key: string, value: any) => {
    const tool = data.tools.find(t => t.id === toolId);
    if (tool) {
      updateTool(toolId, {
        config: { ...tool.config, [key]: value }
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent 
          bg-gradient-to-r from-primary-light to-blue-600 dark:from-primary-dark dark:to-blue-400
          [text-shadow:_0_0_30px_rgb(var(--primary-light-rgb)_/_0.3)]"
        >
          Tools
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Choose tools that AI can use mid-call with the customer
        </p>
        <div className="mt-1 text-sm text-gray-500">
          Step 5 of 6
        </div>
      </div>

      <div className="space-y-6">
        {data.tools.map((tool) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800/50 rounded-lg shadow-sm dark:shadow-none"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {tool.description}
                  </p>
                </div>
                <Switch
                  checked={tool.enabled}
                  onChange={(enabled) => updateTool(tool.id, { enabled })}
                  className={`${
                    tool.enabled ? 'bg-primary-light dark:bg-primary-dark' : 'bg-gray-200 dark:bg-gray-700'
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      tool.enabled ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                  />
                </Switch>
              </div>

              {tool.enabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-4"
                >
                  {tool.id === 'end-call' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        When to End
                      </label>
                      <input
                        type="text"
                        value={tool.config.whenToEnd}
                        onChange={(e) => updateToolConfig(tool.id, 'whenToEnd', e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600
                          bg-white dark:bg-gray-800 px-3 py-2
                          text-gray-900 dark:text-white shadow-sm
                          focus:border-primary-light dark:focus:border-primary-dark
                          focus:outline-none focus:ring-1
                          focus:ring-primary-light dark:focus:ring-primary-dark
                          sm:text-sm"
                        placeholder="Specify when to end the call"
                      />
                    </div>
                  )}

                  {tool.id === 'appointment' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Calendar Integration
                        </label>
                        <div className="mt-1 relative">
                          <select
                            value={tool.config.calendarService}
                            onChange={(e) => updateToolConfig(tool.id, 'calendarService', e.target.value)}
                            className="block w-full rounded-md border border-gray-300 dark:border-gray-600
                              bg-white dark:bg-gray-800 px-3 py-2
                              text-gray-900 dark:text-white shadow-sm
                              focus:border-primary-light dark:focus:border-primary-dark
                              focus:outline-none focus:ring-1
                              focus:ring-primary-light dark:focus:ring-primary-dark
                              appearance-none pr-10 sm:text-sm"
                          >
                            {calendarServices.map((service) => (
                              <option key={service} value={service}>
                                {service}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg space-y-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          Integration Settings
                        </h4>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            API Key<span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            value={tool.config.integrationSettings?.[tool.config.calendarService]?.apiKey || ''}
                            onChange={(e) => {
                              const newSettings = { ...tool.config.integrationSettings } || {};
                              if (!newSettings[tool.config.calendarService]) {
                                newSettings[tool.config.calendarService] = { apiKey: '' };
                                if (tool.config.calendarService === 'Google Calendar') {
                                  newSettings[tool.config.calendarService].calendarId = '';
                                }
                              }
                              newSettings[tool.config.calendarService].apiKey = e.target.value;
                              updateToolConfig(tool.id, 'integrationSettings', newSettings);
                            }}
                            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600
                              bg-white dark:bg-gray-800 px-3 py-2
                              text-gray-900 dark:text-white shadow-sm
                              focus:border-primary-light dark:focus:border-primary-dark
                              focus:outline-none focus:ring-1
                              focus:ring-primary-light dark:focus:ring-primary-dark
                              sm:text-sm"
                            placeholder="Enter your API key"
                          />
                        </div>

                        {tool.config.calendarService === 'Google Calendar' && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Calendar ID
                            </label>
                            <input
                              type="text"
                              value={tool.config.integrationSettings?.['Google Calendar']?.calendarId || ''}
                              onChange={(e) => {
                                const newSettings = { ...tool.config.integrationSettings } || {};
                                if (!newSettings['Google Calendar']) {
                                  newSettings['Google Calendar'] = { apiKey: '', calendarId: '' };
                                }
                                newSettings['Google Calendar'].calendarId = e.target.value;
                                updateToolConfig(tool.id, 'integrationSettings', newSettings);
                              }}
                              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600
                                bg-white dark:bg-gray-800 px-3 py-2
                                text-gray-900 dark:text-white shadow-sm
                                focus:border-primary-light dark:focus:border-primary-dark
                                focus:outline-none focus:ring-1
                                focus:ring-primary-light dark:focus:ring-primary-dark
                                sm:text-sm"
                              placeholder="Enter your calendar ID"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {tool.id === 'transfer' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone Number
                        </label>
                        <div className="mt-1 grid grid-cols-[120px,1fr] gap-2">
                          <div className="relative">
                            <select
                              value={tool.config.countryCode}
                              onChange={(e) => updateToolConfig(tool.id, 'countryCode', e.target.value)}
                              className="block w-full rounded-md border border-gray-300 dark:border-gray-600
                                bg-white dark:bg-gray-800 px-3 py-2
                                text-gray-900 dark:text-white shadow-sm
                                focus:border-primary-light dark:focus:border-primary-dark
                                focus:outline-none focus:ring-1
                                focus:ring-primary-light dark:focus:ring-primary-dark
                                appearance-none pr-10 sm:text-sm"
                            >
                              {countryCodes.map((country) => (
                                <option key={country.code} value={country.code}>
                                  {country.code}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          <input
                            type="tel"
                            value={tool.config.phoneNumber}
                            onChange={(e) => updateToolConfig(tool.id, 'phoneNumber', e.target.value)}
                            className="block w-full rounded-md border border-gray-300 dark:border-gray-600
                              bg-white dark:bg-gray-800 px-3 py-2
                              text-gray-900 dark:text-white shadow-sm
                              focus:border-primary-light dark:focus:border-primary-dark
                              focus:outline-none focus:ring-1
                              focus:ring-primary-light dark:focus:ring-primary-dark
                              sm:text-sm"
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          When to Transfer
                        </label>
                        <input
                          type="text"
                          value={tool.config.whenToTransfer}
                          onChange={(e) => updateToolConfig(tool.id, 'whenToTransfer', e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600
                            bg-white dark:bg-gray-800 px-3 py-2
                            text-gray-900 dark:text-white shadow-sm
                            focus:border-primary-light dark:focus:border-primary-dark
                            focus:outline-none focus:ring-1
                            focus:ring-primary-light dark:focus:ring-primary-dark
                            sm:text-sm"
                          placeholder="Specify when to transfer the call"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {data.tools.some(tool => tool.enabled) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800/50 rounded-lg shadow-sm dark:shadow-none p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Selected Tools
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.tools.filter(t => t.enabled).map((tool) => (
                  <span
                    key={tool.id}
                    className="inline-flex items-center px-3 py-1 rounded-full
                      text-sm font-medium bg-primary-light/10 dark:bg-primary-dark/10
                      text-primary-light dark:text-primary-dark"
                  >
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300
                transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <PencilIcon className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
