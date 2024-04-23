import React from 'react';

interface IconProps {
  height?: number;
  width?: number;
  color?: string;
}

const LocKeyIcon: React.FC<IconProps> = ({ width = 20, height = 21, color = '#727C8D' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 12.9802V14.8552M10 12.9802C10.8629 12.9802 11.5625 12.2807 11.5625 11.4177C11.5625 10.5548 10.8629 9.85522 10 9.85522C9.13706 9.85522 8.4375 10.5548 8.4375 11.4177C8.4375 12.2807 9.13706 12.9802 10 12.9802ZM7.1875 7.35522V4.54272C7.1875 3.7968 7.48382 3.08143 8.01126 2.55399C8.53871 2.02654 9.25408 1.73022 10 1.73022C10.7459 1.73022 11.4613 2.02654 11.9887 2.55399C12.5162 3.08143 12.8125 3.7968 12.8125 4.54272V7.35522M3.75 7.35522H16.25C16.5952 7.35522 16.875 7.63505 16.875 7.98022V16.7302C16.875 17.0754 16.5952 17.3552 16.25 17.3552H3.75C3.40482 17.3552 3.125 17.0754 3.125 16.7302V7.98022C3.125 7.63505 3.40482 7.35522 3.75 7.35522Z"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default LocKeyIcon;
