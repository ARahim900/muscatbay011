
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { KpiCardProps } from '../../types';
import Card from './Card';

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, isPositive, icon }) => {
  return (
    <Card>
      <div className="flex items-center">
        <div className="p-4 bg-mint dark:bg-accent rounded-full text-primary dark:text-white mr-6">
            {React.cloneElement(icon as React.ReactElement, { size: 28 })}
        </div>
        <div>
          <p className="text-base font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
          <p className="mt-1 text-4xl font-semibold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
      {change && (
        <div className="flex items-baseline mt-4">
          <span className={`flex items-center text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span className="ml-1">{change}</span>
          </span>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">from last period</span>
        </div>
      )}
    </Card>
  );
};

export default KpiCard;