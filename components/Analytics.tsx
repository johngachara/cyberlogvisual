import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { LogEntry } from '../types';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Activity } from 'lucide-react';

interface AnalyticsProps {
  logs: LogEntry[];
}

const COLORS = {
  allowed: '#10b981',
  blocked: '#ef4444',
  monitored: '#f59e0b',
};

const METHOD_COLORS = {
  GET: '#10b981',
  POST: '#3b82f6',
  PUT: '#f59e0b',
  DELETE: '#ef4444',
  PATCH: '#8b5cf6',
};

const Analytics: React.FC<AnalyticsProps> = ({ logs }) => {
  const decisionData = useMemo(() => {
    const counts = logs.reduce((acc, log) => {
      acc[log.decision] = (acc[log.decision] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([decision, count]) => ({
      name: decision.charAt(0).toUpperCase() + decision.slice(1),
      value: count,
      color: COLORS[decision as keyof typeof COLORS],
    }));
  }, [logs]);

  const methodData = useMemo(() => {
    const counts = logs.reduce((acc, log) => {
      acc[log.method] = (acc[log.method] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([method, count]) => ({
      method,
      count,
      fill: METHOD_COLORS[method as keyof typeof METHOD_COLORS] || '#6b7280',
    }));
  }, [logs]);

  const timelineData = useMemo(() => {
    const hourCounts = logs.reduce((acc, log) => {
      const hour = new Date(log.created_at).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return Array.from({ length: 24 }, (_, hour) => ({
      hour: `${hour.toString().padStart(2, '0')}:00`,
      requests: hourCounts[hour] || 0,
    }));
  }, [logs]);

  const stats = useMemo(() => {
    const total = logs.length;
    const blocked = logs.filter(log => log.decision === 'MALICIOUS').length;
    const allowed = logs.filter(log => log.decision === 'BENIGN').length;
    const monitored = logs.filter(log => log.decision === 'monitored').length;


    return { total, blocked, allowed, monitored };
  }, [logs]);

  if (logs.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center animate-fade-in">
        <Activity className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Analytics Data</h3>
        <p className="text-gray-500 dark:text-gray-400">Analytics will appear once log data is available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Requests</p>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{stats.total.toLocaleString()}</p>
            </div>
            <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Allowed</p>
              <p className="text-3xl font-bold text-emerald-900 dark:text-emerald-100">{stats.allowed.toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-emerald-600 dark:bg-emerald-400 rounded-full flex items-center justify-center">
              <span className="text-white dark:text-emerald-900 text-sm font-bold">✓</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">Blocked</p>
              <p className="text-3xl font-bold text-red-900 dark:text-red-100">{stats.blocked.toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-red-600 dark:bg-red-400 rounded-full flex items-center justify-center">
              <span className="text-white dark:text-red-900 text-sm font-bold">✕</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Decision Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-6">
            <PieChartIcon className="h-6 w-6 text-gray-600 dark:text-gray-400 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Decision Distribution</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={decisionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {decisionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Request Methods */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-6">
            <BarChart3 className="h-6 w-6 text-gray-600 dark:text-gray-400 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Request Methods</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={methodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis 
                  dataKey="method" 
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#f9fafb'
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center mb-6">
          <TrendingUp className="h-6 w-6 text-gray-600 dark:text-gray-400 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Request Volume by Hour</h3>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="hour" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#f9fafb'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="requests" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;