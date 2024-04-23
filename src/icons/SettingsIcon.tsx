import * as React from 'react';

interface SettingsIconProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
}

export function SettingsIcon({
  width = 21,
  height = 20,
  fill = 'none',
  stroke = '#88909F',
  strokeWidth = 1.5,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
}: SettingsIconProps): React.JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 21 20" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.8392 6.35305L17.3205 5.45298C16.8817 4.69138 15.9092 4.42864 15.1466 4.86564V4.86564C14.7835 5.07949 14.3504 5.14017 13.9425 5.03428C13.5347 4.92839 13.1858 4.66464 12.9727 4.30118C12.8355 4.07016 12.7619 3.80704 12.7591 3.53841V3.53841C12.7714 3.10773 12.609 2.69038 12.3086 2.38143C12.0083 2.07249 11.5957 1.89826 11.1649 1.89844H10.1199C9.69776 1.89843 9.29305 2.06664 8.99528 2.36583C8.69752 2.66502 8.53126 3.07053 8.53329 3.49264V3.49264C8.52078 4.36415 7.81068 5.06405 6.93909 5.06396C6.67046 5.06117 6.40733 4.98749 6.17631 4.85038V4.85038C5.41367 4.41339 4.44121 4.67612 4.0024 5.43772L3.44557 6.35305C3.00729 7.1137 3.26645 8.08555 4.02528 8.52697V8.52697C4.51854 8.81174 4.82239 9.33803 4.82239 9.90759C4.82239 10.4771 4.51854 11.0034 4.02528 11.2882V11.2882C3.26742 11.7267 3.00797 12.6961 3.44557 13.4545V13.4545L3.97189 14.3622C4.17749 14.7332 4.52245 15.007 4.93045 15.1229C5.33844 15.2389 5.77582 15.1875 6.1458 14.9801V14.9801C6.50952 14.7678 6.94294 14.7097 7.34973 14.8185C7.75653 14.9274 8.10298 15.1942 8.31209 15.5598C8.4492 15.7908 8.52288 16.0539 8.52567 16.3225V16.3225C8.52567 17.203 9.23941 17.9167 10.1199 17.9167H11.1649C12.0424 17.9168 12.7549 17.2076 12.7591 16.3302V16.3302C12.757 15.9067 12.9243 15.5001 13.2238 15.2006C13.5232 14.9012 13.9298 14.7339 14.3533 14.736C14.6213 14.7431 14.8833 14.8165 15.1161 14.9495V14.9495C15.8767 15.3878 16.8485 15.1287 17.29 14.3698V14.3698L17.8392 13.4545C18.0517 13.0896 18.1101 12.655 18.0013 12.247C17.8925 11.839 17.6255 11.4912 17.2595 11.2806V11.2806C16.8934 11.07 16.6264 10.7222 16.5176 10.3142C16.4088 9.90613 16.4672 9.47156 16.6797 9.10668C16.818 8.86532 17.0181 8.66521 17.2595 8.52697V8.52697C18.0137 8.08579 18.2723 7.11962 17.8392 6.36068V6.36068V6.35305Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
      <ellipse
        cx="10.646"
        cy="9.90749"
        rx="2.1968"
        ry="2.1968"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      />
    </svg>
  );
}
