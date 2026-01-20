import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  valueClassName?: string;
  formula?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, valueClassName = '', formula }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col h-full">
      <h3 className="text-sm font-semibold text-gray-600 mb-1">{title}</h3>
      <div className={`text-3xl font-bold mb-2 ${valueClassName}`}>
        {value}
      </div>
      <p className="text-xs text-gray-500 mb-4 flex-grow">{description}</p>
      {formula && (
        <div className="mt-auto pt-4 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 font-mono italic">
            Formule: {formula}
          </p>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
