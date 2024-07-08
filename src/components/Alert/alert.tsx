import React from 'react';

interface AlertProps {
  type: string;
  message: string;
  onClose: () => void;
}

const Alert = ({ type, message, onClose }: AlertProps) => {
  const alertTypes = {
    success: {
      backgroundColor: 'bg-green-50',
      textColor: 'text-green-800',
      buttonColor: 'text-green-500',
      hoverBgColor: 'hover:bg-green-200',
      iconFillColor: 'currentColor',
    },
    error: {
      backgroundColor: 'bg-red-50',
      textColor: 'text-red-800',
      buttonColor: 'text-red-500',
      hoverBgColor: 'hover:bg-red-200',
      iconFillColor: 'currentColor',
    },
  };

  const {
    backgroundColor,
    textColor,
    buttonColor,
    hoverBgColor,
    iconFillColor,
  } = alertTypes[type as keyof typeof alertTypes];

  return (
    <div
      className={`flex w-full items-center p-4 mb-4 rounded-lg ${backgroundColor} dark:bg-gray-800 ${textColor} dark:${textColor}`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 w-4 h-4"
        aria-hidden="true"
        fill={iconFillColor}
        viewBox="0 0 20 20"
      >
        {/* SVG path remains the same for simplicity */}
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button
        type="button"
        className={`ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 ${buttonColor} ${hoverBgColor} p-1.5 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:${textColor} dark:hover:bg-gray-700`}
        aria-label="Close"
        onClick={onClose}
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Alert;
