import React from 'react';

export function RadialProgress({ score, maxScore = 100, label, isDark, size = 120 }) {
  const percentage = (score / maxScore) * 100;
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 75) return '#10b981'; // green
    if (percentage >= 50) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const getBackgroundColor = () => {
    if (percentage >= 75) return isDark ? '#065f46' : '#d1fae5';
    if (percentage >= 50) return isDark ? '#78350f' : '#fef3c7';
    return isDark ? '#7f1d1d' : '#fee2e2';
  };

  return (
    <div className="flex flex-col items-center">
      <div style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: getBackgroundColor(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <svg
          width={size}
          height={size}
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isDark ? '#374151' : '#e5e7eb'}
            strokeWidth="3"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.5s ease',
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className={`text-xl font-black ${
            percentage >= 75 ? 'text-green-600' :
            percentage >= 50 ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {score}
          </span>
          <span className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}