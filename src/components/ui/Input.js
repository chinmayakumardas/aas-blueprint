'use client';
import React from 'react';
import { cn } from '@/utils/clsx';

const Input = ({
  id,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  error = '',
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        className={cn(
          'w-full rounded-xl border px-4 py-2 text-sm shadow-sm transition-all duration-200 focus:outline-none',
          'focus:ring-2 focus:ring-primary/60 focus:border-primary',
          disabled && 'cursor-not-allowed bg-gray-100 text-gray-400',
          error
            ? 'border-red-500 focus:ring-red-400'
            : 'border-gray-300',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-red-600 font-medium">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
