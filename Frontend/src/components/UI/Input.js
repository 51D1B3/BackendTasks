import React, { memo, forwardRef } from 'react';

const Input = memo(forwardRef(({ 
  label,
  error,
  className = '',
  type = 'text',
  ...props 
}, ref) => {
  const inputClasses = `input-field ${error ? 'border-danger-500 focus:ring-danger-500' : ''} ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-danger-600">{error}</p>
      )}
    </div>
  );
}));

Input.displayName = 'Input';

export default Input;
