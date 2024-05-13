import * as React from 'react';

interface ReportIconProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function ReportIcon({
  width = 21,
  height = 20,
  fill = 'none',
  stroke = '#88909F',
  strokeWidth = 1.5,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: ReportIconProps): React.JSX.Element {
  return (
    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.16732 11.6666V15M13.834 9.99996V15M10.5007 6.66663V15M17.1673 5.66663V14.3333C17.1673 15.7334 17.1673 16.4335 16.8948 16.9683C16.6552 17.4387 16.2727 17.8211 15.8023 18.0608C15.2675 18.3333 14.5674 18.3333 13.1673 18.3333H7.83398C6.43385 18.3333 5.73379 18.3333 5.19901 18.0608C4.7286 17.8211 4.34615 17.4387 4.10647 16.9683C3.83398 16.4335 3.83398 15.7334 3.83398 14.3333V5.66663C3.83398 4.26649 3.83398 3.56643 4.10647 3.03165C4.34615 2.56124 4.7286 2.17879 5.19901 1.93911C5.73379 1.66663 6.43385 1.66663 7.83398 1.66663H13.1673C14.5674 1.66663 15.2675 1.66663 15.8023 1.93911C16.2727 2.17879 16.6552 2.56124 16.8948 3.03165C17.1673 3.56643 17.1673 4.26649 17.1673 5.66663Z"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
