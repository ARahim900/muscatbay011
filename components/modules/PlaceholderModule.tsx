
import React from 'react';
import Card from '../ui/Card';

interface PlaceholderModuleProps {
  title: string;
}

const PlaceholderModule: React.FC<PlaceholderModuleProps> = ({ title }) => {
  return (
    <Card>
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400">Content for this section is under construction.</p>
      </div>
    </Card>
  );
};

export default PlaceholderModule;
