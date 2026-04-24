import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts';

interface QuartileData {
  quartile: string;
  malePercentage: number;
  femalePercentage: number;
}

interface CategoryGapData {
  category: string;
  meanGapBase: number | null;
  meanGapVariable: number | null;
  meanGapTotal: number | null;
}

export const QuartileChart: React.FC<{ data: QuartileData[] }> = ({ data }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="quartile" />
          <YAxis unit="%" />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, '']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend />
          <Bar dataKey="malePercentage" name="Mannen" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="femalePercentage" name="Vrouwen" fill="#ec4899" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CategoryGapChart: React.FC<{ data: CategoryGapData[] }> = ({ data }) => {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
          <XAxis type="number" unit="%" />
          <YAxis 
            dataKey="category" 
            type="category" 
            width={90}
            style={{ fontSize: '12px', fontWeight: 500 }}
          />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'LOONVERSCHILLEN MAN/VROUW']}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend />
          <Bar dataKey="meanGapTotal" name="LOONVERSCHILLEN MAN/VROUW (%)" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.meanGapTotal > 5 ? '#ef4444' : '#10b981'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export interface GenderPieDatum {
  label: string;
  value: number;
  color: string;
}

export const GenderPieChart: React.FC<{ data: GenderPieDatum[] }> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Tooltip
            formatter={(value: number, name: string) => {
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
              return [`${value} (${percentage}%)`, name];
            }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend />
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={2}
            stroke="transparent"
          >
            {data.map((entry) => (
              <Cell key={entry.label} fill={entry.color} />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};
