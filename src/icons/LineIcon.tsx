import React from 'react';

interface IconProps {
  height?: number;
  color?: string;
}

const LineIcon: React.FC<IconProps> = ({ height = 17, color = '#B3B8C2' }) => {
  return (
    <svg width="1" height={height} viewBox="0 0 1 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0.5" y1="0.480225" x2="0.499999" y2="16.4802" stroke={color} />
    </svg>
  );
};

export default LineIcon;
