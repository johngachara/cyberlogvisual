/**
 * Charts component for visualizing log data analytics
 */

import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LogEntry } from '../../types';

interface ChartsProps {
  logs: LogEntry[];
}

const Charts: React.FC<ChartsProps> = ({ logs }) => {
  // Prepare data for decision distribution pie chart
  const decisionData = logs.reduce((acc, log) => {
    const decision = log.decision.toLowerCase();
    acc[decision] = (acc[decision] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(decisionData).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));

  // Prepare data for method distribution bar chart
  const methodData = logs.reduce((acc, log) => {
    const method = log.method;
    acc[method] = (acc[method] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barData = Object.entries(methodData).map(([key, value]) => ({
    method: key,
    count: value,
  }));

  // Colors for charts
  const COLORS = ['#10B981', '#EF4444', '#F59E0B', '#6B7280'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Decision Distribution Pie Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Decision Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--tooltip-bg)',
                border: '1px solid var(--tooltip-border)',
                borderRadius: '8px',
                color: 'var(--tooltip-text)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* HTTP Method Distribution Bar Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">HTTP Methods</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis 
              dataKey="method" 
              stroke="var(--chart-text)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--chart-text)"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--tooltip-bg)',
                border: '1px solid var(--tooltip-border)',
                borderRadius: '8px',
                color: 'var(--tooltip-text)'
              }}
            />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;