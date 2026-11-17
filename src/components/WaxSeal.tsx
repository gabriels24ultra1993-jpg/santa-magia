import React from 'react';

interface WaxSealProps {
  label: string;
}

export const WaxSeal: React.FC<WaxSealProps> = ({ label }) => {
  return (
    <div
      className="relative inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 select-none shrink-0"
      aria-label={label}
    >
      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
        <defs>
          <radialGradient id="waxGrad" cx="35%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="68%" stopColor="#991b1b" />
            <stop offset="100%" stopColor="#6b1010" />
          </radialGradient>
        </defs>
        {/* Scalloped outer wax edge */}
        <path
          d="M60,6 C68,6 73,10 80,10 C87,10 92,16 98,20 C104,25 107,32 110,39 C114,46 112,53 114,60 C115,67 110,74 109,81 C108,88 102,93 97,99 C91,104 84,106 77,109 C70,112 63,111 56,113 C49,114 42,109 35,107 C28,105 23,99 17,94 C12,89 11,81 8,74 C6,67 8,60 7,53 C6,46 11,39 12,32 C14,25 20,20 26,15 C32,11 39,10 46,8 C52,6 56,6 60,6 Z"
          fill="url(#waxGrad)"
        />
        <circle
          cx="60"
          cy="60"
          r="42"
          fill="none"
          stroke="rgba(253, 230, 138, 0.65)"
          strokeWidth="1.6"
          strokeDasharray="3 2"
        />
        <circle
          cx="60"
          cy="60"
          r="35"
          fill="none"
          stroke="rgba(254, 243, 199, 0.4)"
          strokeWidth="1"
        />
        {/* 8-point North Pole Star */}
        <polygon
          points="60,31 65,49 83,54 65,59 60,77 55,59 37,54 55,49"
          fill="#fde68a"
        />
        <text
          x="60"
          y="89"
          textAnchor="middle"
          fill="#fef3c7"
          fontSize="6.8"
          fontWeight="700"
          letterSpacing="0.8"
        >
          {label.slice(0, 19)}
        </text>
      </svg>
    </div>
  );
};
