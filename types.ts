// Fix: Import React types to resolve 'Cannot find namespace React' errors.
import type { ReactNode, ComponentType } from 'react';

export type NavItemType = 'Water' | 'Electricity' | 'HVAC' | 'Firefighting' | 'STP Plant';

export interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  // Fix: Use imported ReactNode type to resolve 'Cannot find namespace React' error.
  icon: ReactNode;
}

export interface NavItem {
    name: NavItemType;
    // Fix: Use imported ComponentType type to resolve 'Cannot find namespace React' error.
    icon: ComponentType<{ className?: string }>;
}
