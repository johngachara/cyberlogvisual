import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { LogEntry } from '../types';
import { BarChart3, PieChart as PieChartIcon, TrendingUp, Activity, ShieldAlert, ShieldCheck, Eye } from 'lucide-react';

interface AnalyticsProps {
  logs: LogEntry[];
}

const COLORS = {
  allowed: '#10b981',
  blocked: '#ef4444',
  monitored: '#f59e0b',
  BENIGN: '#10b981',
  MALICIOUS: '#ef4444',
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
      color: COLORS[decision as keyof typeof COLORS] || '#6b7280',
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
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8 text-center animate-fadeIn transition-all duration-300">
        <Activity className="mx-auto h-16 w-16 text-gray-400 mb-4 opacity-70" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Analytics Data</h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Analytics will appear once log data is available. Please check back later or refresh the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-blue-50/90 to-blue-100/80 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Requests</p>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-1">{stats.total.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-500/10 dark:bg-blue-400/10 rounded-xl">
              <Activity className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50/90 to-emerald-100/80 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-800/50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Allowed</p>
              <p className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 mt-1">{stats.allowed.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-xl">
              <ShieldCheck className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50/90 to-red-100/80 dark:from-red-900/20 dark:to-red-800/20 rounded-2xl p-6 border border-red-200/50 dark:border-red-800/50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">Blocked</p>
              <p className="text-3xl font-bold text-red-900 dark:text-red-100 mt-1">{stats.blocked.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-red-500/10 dark:bg-red-400/10 rounded-xl">
              <ShieldAlert className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50/90 to-amber-100/80 dark:from-amber-900/20 dark:to-amber-800/20 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-800/50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Monitored</p>
              <p className="text-3xl font-bold text-amber-900 dark:text-amber-100 mt-1">{stats.monitored.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-amber-500/10 dark:bg-amber-400/10 rounded-xl">
              <Eye className="h-8 w-8 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Decision Distribution */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3">
              <PieChartIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
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
                  paddingAngle={2}
                >
                  {decisionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    borderRadius: '10px',
                    border: 'none',
                    padding: '10px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    fontSize: '14px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Request Methods */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3">
              <BarChart3 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Request Methods</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={methodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis 
                  dataKey="method" 
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ strokeWidth: 1, stroke: 'rgba(107, 114, 128, 0.3)' }}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickLine={false}
                  axisLine={{ strokeWidth: 1, stroke: 'rgba(107, 114, 128, 0.3)' }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(107, 114, 128, 0.1)' }}
                  contentStyle={{
                    backgroundColor: 'rgba(31, 41, 55, 0.95)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#f9fafb',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                  }}
                />
                <Bar 
                  dataKey="count" 
                  radius={[6, 6, 0, 0]} 
                  animationDuration={1500}
                  animationEasing="ease-in-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center mb-6">
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg mr-3">
            <TrendingUp className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Request Volume by Hour</h3>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
              <defs>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="hour" 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={{ strokeWidth: 1, stroke: 'rgba(107, 114, 128, 0.3)' }}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickLine={false}
                axisLine={{ strokeWidth: 1, stroke: 'rgba(107, 114, 128, 0.3)' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(31, 41, 55, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#f9fafb',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="requests" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4, strokeDasharray: '' }}
                activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
                animationDuration={1500}
                animationEasing="ease-in-out"
                fill="url(#colorRequests)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;