import * as React from 'react';

interface EmissionTrackingIconProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function EmissionTrackingIcon({
  width = 21,
  height = 20,
  fill = 'none',
  stroke = '#88909F',
  strokeWidth = 1.5,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: EmissionTrackingIconProps): React.JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.6667 7.5L10.1381 12.0286C9.97306 12.1936 9.89056 12.2761 9.79542 12.307C9.71174 12.3342 9.62159 12.3342 9.53791 12.307C9.44277 12.2761 9.36027 12.1936 9.19526 12.0286L7.63807 10.4714C7.47306 10.3064 7.39056 10.2239 7.29542 10.193C7.21174 10.1658 7.12159 10.1658 7.03791 10.193C6.94277 10.2239 6.86027 10.3064 6.69526 10.4714L3 14.1667M14.6667 7.5H11.3333M14.6667 7.5V10.8333M7 17.5H14C15.4001 17.5 16.1002 17.5 16.635 17.2275C17.1054 16.9878 17.4878 16.6054 17.7275 16.135C18 15.6002 18 14.9001 18 13.5V6.5C18 5.09987 18 4.3998 17.7275 3.86502C17.4878 3.39462 17.1054 3.01217 16.635 2.77248C16.1002 2.5 15.4001 2.5 14 2.5H7C5.59987 2.5 4.8998 2.5 4.36502 2.77248C3.89462 3.01217 3.51217 3.39462 3.27248 3.86502C3 4.3998 3 5.09987 3 6.5V13.5C3 14.9001 3 15.6002 3.27248 16.135C3.51217 16.6054 3.89462 16.9878 4.36502 17.2275C4.8998 17.5 5.59987 17.5 7 17.5Z"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
