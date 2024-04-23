import * as React from 'react';

interface DataIconProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function DataIcon({
  width = 21,
  height = 20,
  fill = 'none',
  stroke = '#88909F',
  strokeWidth = 1.5,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: DataIconProps): React.JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 21 20" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.166 18.3333C18.3994 18.3333 18.516 18.3333 18.6052 18.2879C18.6836 18.2479 18.7473 18.1842 18.7873 18.1058C18.8327 18.0167 18.8327 17.9 18.8327 17.6666V8.99996C18.8327 8.76661 18.8327 8.64993 18.7873 8.5608C18.7473 8.4824 18.6836 8.41866 18.6052 8.37871C18.516 8.33329 18.3994 8.33329 18.166 8.33329L16.166 8.33329C15.9327 8.33329 15.816 8.33329 15.7269 8.37871C15.6485 8.41865 15.5847 8.4824 15.5448 8.5608C15.4993 8.64993 15.4993 8.76661 15.4993 8.99996V11C15.4993 11.2333 15.4993 11.35 15.4539 11.4391C15.414 11.5175 15.3502 11.5813 15.2718 11.6212C15.1827 11.6666 15.066 11.6666 14.8327 11.6666H12.8327C12.5993 11.6666 12.4826 11.6666 12.3935 11.712C12.3151 11.752 12.2514 11.8157 12.2114 11.8941C12.166 11.9833 12.166 12.0999 12.166 12.3333V14.3333C12.166 14.5666 12.166 14.6833 12.1206 14.7725C12.0807 14.8509 12.0169 14.9146 11.9385 14.9545C11.8494 15 11.7327 15 11.4993 15H9.49935C9.26599 15 9.14932 15 9.06019 15.0454C8.98179 15.0853 8.91804 15.1491 8.8781 15.2275C8.83268 15.3166 8.83268 15.4333 8.83268 15.6666V17.6666C8.83268 17.9 8.83268 18.0167 8.8781 18.1058C8.91804 18.1842 8.98179 18.2479 9.06019 18.2879C9.14932 18.3333 9.26599 18.3333 9.49935 18.3333L18.166 18.3333Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
      <path
        d="M8.83268 5.66663C8.83268 5.43327 8.83268 5.31659 8.8781 5.22746C8.91804 5.14906 8.98179 5.08532 9.06019 5.04537C9.14932 4.99996 9.26599 4.99996 9.49935 4.99996H11.4993C11.7327 4.99996 11.8494 4.99996 11.9385 5.04537C12.0169 5.08532 12.0807 5.14906 12.1206 5.22746C12.166 5.31659 12.166 5.43327 12.166 5.66663V7.66663C12.166 7.89998 12.166 8.01666 12.1206 8.10579C12.0807 8.18419 12.0169 8.24793 11.9385 8.28788C11.8494 8.33329 11.7327 8.33329 11.4993 8.33329H9.49935C9.26599 8.33329 9.14932 8.33329 9.06019 8.28788C8.98179 8.24793 8.91804 8.18419 8.8781 8.10579C8.83268 8.01666 8.83268 7.89998 8.83268 7.66663V5.66663Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
      <path
        d="M2.99935 10.6666C2.99935 10.4333 2.99935 10.3166 3.04476 10.2275C3.08471 10.1491 3.14845 10.0853 3.22685 10.0454C3.31598 9.99996 3.43266 9.99996 3.66602 9.99996H5.66602C5.89937 9.99996 6.01605 9.99996 6.10518 10.0454C6.18358 10.0853 6.24732 10.1491 6.28727 10.2275C6.33268 10.3166 6.33268 10.4333 6.33268 10.6666V12.6666C6.33268 12.9 6.33268 13.0167 6.28727 13.1058C6.24732 13.1842 6.18358 13.2479 6.10518 13.2879C6.01605 13.3333 5.89937 13.3333 5.66602 13.3333H3.66602C3.43266 13.3333 3.31598 13.3333 3.22685 13.2879C3.14845 13.2479 3.08471 13.1842 3.04476 13.1058C2.99935 12.9 2.99935 12.6666V10.6666Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
      <path
        d="M2.16602 2.33329C2.16602 2.09994 2.16602 1.98326 2.21143 1.89413C2.25138 1.81573 2.31512 1.75199 2.39352 1.71204C2.48265 1.66663 2.59933 1.66663 2.83268 1.66663H4.83268C5.06604 1.66663 5.18272 1.66663 5.27185 1.71204C5.35025 1.75199 5.41399 1.81573 5.45394 1.89413C5.49935 1.98326 5.49935 2.09994 5.49935 2.33329V4.33329C5.49935 4.56665 5.49935 4.68333 5.45394 4.77246C5.41399 4.85086 5.35025 4.9146 5.27185 4.95455C5.18272 4.99996 5.06604 4.99996 4.83268 4.99996H2.83268C2.59933 4.99996 2.48265 4.99996 2.39352 4.95455C2.31512 4.9146 2.25138 4.85086 2.21143 4.77246C2.16602 4.68333 2.16602 4.56665 2.16602 4.33329V2.33329Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </svg>
  );
}
