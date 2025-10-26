import React, { useState } from 'react';
import { useWaterMonthly } from '../hooks/useWaterMonthly';
import { Card } from './ui/Card';
import { Droplets, TrendingUp, Filter, Search } from 'lucide-react';

export function WaterMonthlyDashboard() {
  const { records, loading, error, zones, types, filterByZone, filterByType, search, reset } = useWaterMonthly();
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Handle zone filter
  const handleZoneChange = (zone: string) => {
    setSelectedZone(zone);
    if (zone === 'all') {
      reset();
    } else {
      filterByZone(zone);
    }
  };

  // Handle type filter
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    if (type === 'all') {
      reset();
    } else {
      filterByType(type);
    }
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() === '') {
      reset();
    } else {
      search(term);
    }
  };

  // Calculate statistics
  const stats = React.useMemo(() => {
    const totalRecords = records.length;
    const activeZones = new Set(records.map(r => r.Zone).filter(Boolean)).size;
    const meterTypes = new Set(records.map(r => r.Type).filter(Boolean)).size;

    return { totalRecords, activeZones, meterTypes };
  }, [records]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading water monthly data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="!p-6 max-w-md">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Error Loading Data</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={reset}
              className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Water System Dashboard</h2>
        <p className="text-gray-600 dark:text-gray-400">Connected to Supabase backend</p>
      </div>

      {/* Filters */}
      <Card className="!p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Zone Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Filter className="w-4 h-4" />
              Filter by Zone
            </label>
            <select
              value={selectedZone}
              onChange={(e) => handleZoneChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent"
            >
              <option value="all">All Zones</option>
              {zones.map(zone => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Filter className="w-4 h-4" />
              Filter by Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent"
            >
              <option value="all">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Search className="w-4 h-4" />
              Search by Meter Label
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Enter meter label..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Records</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalRecords}</p>
            </div>
          </div>
        </Card>

        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Filter className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Zones</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeZones}</p>
            </div>
          </div>
        </Card>

        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Meter Types</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.meterTypes}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Meter Label</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Zone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Jan-25</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Feb-25</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mar-25</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Apr-25</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">May-25</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Jun-25</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Jul-25</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aug-25</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sep-25</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {records.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No records found
                  </td>
                </tr>
              ) : (
                records.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{record['Meter Label']}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{record['Zone'] || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{record['Type'] || '-'}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{record['Jan-25'] || '-'}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{record['Feb-25'] || '-'}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{record['Mar-25'] || '-'}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{record['Apr-25'] || '-'}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{record['May-25'] || '-'}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{record['Jun-25'] || '-'}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{record['Jul-25'] || '-'}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{record['Aug-25'] || '-'}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600 dark:text-gray-400">{record['Sep-25'] || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
