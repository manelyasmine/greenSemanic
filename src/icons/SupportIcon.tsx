import * as React from 'react';

interface SupportIconProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function SupportIcon({
  width = 21,
  height = 20,
  fill = 'none',
  stroke = '#88909F',
  strokeWidth = 1.5,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: SupportIconProps): React.JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 21 20" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 15V10C18 5.85786 14.6421 2.5 10.5 2.5C6.35786 2.5 3 5.85786 3 10V15M5.08333 17.5C3.93274 17.5 3 16.5673 3 15.4167V13.75C3 12.5994 3.93274 11.6667 5.08333 11.6667C6.23393 11.6667 7.16667 12.5994 7.16667 13.75V15.4167C7.16667 16.5673 6.23393 17.5 5.08333 17.5ZM15.9167 17.5C14.7661 17.5 13.8333 16.5673 13.8333 15.4167V13.75C13.8333 12.5994 14.7661 11.6667 15.9167 11.6667C17.0673 11.6667 18 12.5994 18 13.75V15.4167C18 16.5673 17.0673 17.5 15.9167 17.5Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </svg>
  );
}
