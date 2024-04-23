import * as React from 'react';

export interface NavItemConfig {
  key: string;
  title?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  icon?: any;
  href?: string;
  items?: NavItemConfig[];
  // Matcher specifies how to match URLs for navigation.
  // The type can be 'startsWith' or 'equals' to match the beginning or exact URL, respectively.
  matcher?: { type: 'startsWith' | 'equals'; href: string };
}
