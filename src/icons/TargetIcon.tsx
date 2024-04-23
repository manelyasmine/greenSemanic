import * as React from 'react';

interface TargetIconProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function TargetIcon({
  width = 21,
  height = 20,
  fill = 'none',
  stroke = '#88909F',
  strokeWidth = 1.5,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: TargetIconProps): React.JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 21 20" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.8326 6.66663V4.16663L16.3326 1.66663L17.166 3.33329L18.8326 4.16663L16.3326 6.66663H13.8326ZM13.8326 6.66663L10.4993 9.99992M18.8327 9.99996C18.8327 14.6023 15.1017 18.3333 10.4993 18.3333C5.89698 18.3333 2.16602 14.6023 2.16602 9.99996C2.16602 5.39759 5.89698 1.66663 10.4993 1.66663M14.666 9.99996C14.666 12.3011 12.8005 14.1666 10.4993 14.1666C8.19816 14.1666 6.33268 12.3011 6.33268 9.99996C6.33268 7.69877 8.19816 5.83329 10.4993 5.83329"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </svg>
  );
}
