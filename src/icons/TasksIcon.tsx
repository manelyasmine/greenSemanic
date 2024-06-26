import * as React from 'react';

interface TasksIconProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

export function TasksIcon({ width = 21, height = 20, stroke = '#88909F' }: TasksIconProps): React.JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.8086 7.3999H15.1836"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.81641 7.3999L6.44141 8.0249L8.31641 6.1499"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.8086 13.2334H15.1836"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.81641 13.2334L6.44141 13.8584L8.31641 11.9834"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.99935 18.3334H12.9993C17.166 18.3334 18.8327 16.6667 18.8327 12.5001V7.50008C18.8327 3.33341 17.166 1.66675 12.9993 1.66675H7.99935C3.83268 1.66675 2.16602 3.33341 2.16602 7.50008V12.5001C2.16602 16.6667 3.83268 18.3334 7.99935 18.3334Z"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
