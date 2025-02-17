import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'secondary' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
}

const buttonStyles = {
  primary: {
    base: 'bg-[rgb(0,191,255,0.9)] dark:bg-[rgb(0,191,255,0.9)] text-white',
    border: 'border-[rgb(0,191,255,0.5)] dark:border-[rgb(0,191,255,0.5)]',
    shadow: 'shadow-[rgb(0,191,255,0.2)] dark:shadow-[rgb(0,191,255,0.2)]',
    hover: 'hover:shadow-[rgb(0,191,255,0.3)] dark:hover:shadow-[rgb(0,191,255,0.3)]',
    glow: 'before:bg-[rgb(0,191,255,0.2)] dark:before:bg-[rgb(0,191,255,0.2)]',
    glowHover: 'hover:before:bg-[rgb(0,191,255,0.3)] dark:hover:before:bg-[rgb(0,191,255,0.3)]',
  },
  secondary: {
    base: 'bg-gray-100/90 dark:bg-navy-700/90 text-gray-900 dark:text-white',
    border: 'border-gray-200/50 dark:border-gray-700/50',
    shadow: 'shadow-gray-200/20 dark:shadow-navy-900/30',
    hover: 'hover:shadow-gray-200/30 dark:hover:shadow-navy-900/40',
    glow: 'before:bg-gray-200/20 dark:before:bg-navy-900/20',
    glowHover: 'hover:before:bg-gray-200/30 dark:hover:before:bg-navy-900/30',
  },
  danger: {
    base: 'bg-red-500/90 dark:bg-red-600/90 text-white',
    border: 'border-red-400/50 dark:border-red-500/50',
    shadow: 'shadow-red-500/20 dark:shadow-red-600/20',
    hover: 'hover:shadow-red-500/30 dark:hover:shadow-red-600/30',
    glow: 'before:bg-red-500/20 dark:before:bg-red-600/20',
    glowHover: 'hover:before:bg-red-500/30 dark:hover:before:bg-red-600/30',
  },
  warning: {
    base: 'bg-yellow-500/90 dark:bg-yellow-600/90 text-white',
    border: 'border-yellow-400/50 dark:border-yellow-500/50',
    shadow: 'shadow-yellow-500/20 dark:shadow-yellow-600/20',
    hover: 'hover:shadow-yellow-500/30 dark:hover:shadow-yellow-600/30',
    glow: 'before:bg-yellow-500/20 dark:before:bg-yellow-600/20',
    glowHover: 'hover:before:bg-yellow-500/30 dark:hover:before:bg-yellow-600/30',
  },
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

export default function GlowButton({
  children,
  onClick,
  type = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  fullWidth = false,
  htmlType = 'button',
}: GlowButtonProps) {
  const styles = buttonStyles[type];
  const sizeStyle = sizeStyles[size];

  return (
    <motion.button
      type={htmlType}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={disabled ? undefined : onClick}
      className={`
        relative rounded-lg font-medium
        ${styles.base}
        ${sizeStyle}
        ${fullWidth ? 'w-full' : ''}
        backdrop-blur-sm
        border ${styles.border}
        shadow-lg ${styles.shadow}
        hover:shadow-xl ${styles.hover}
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200 ease-in-out
        before:absolute before:inset-0
        before:rounded-lg before:z-[-1]
        before:transition-all before:duration-200
        ${styles.glow}
        before:blur-xl before:opacity-0
        hover:before:opacity-100
        ${styles.glowHover}
        ${className}
      `}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
