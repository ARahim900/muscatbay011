import React, { useState } from 'react';
import Card from '../../ui/Card';
import { useStpPlant } from '../../../hooks/useStpPlant';
import { Search, Download, RefreshCw, AlertCircle } from 'lucide-react';

const DetailsData: React.FC = () => {
  const { records, loading, error, refetch } = useStpPlant();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  // Filter records based on search term
  const filteredRecords = records.filter(record => {
    const searchLower = searchTerm.toLowerCase();
    return (
      record.J361?.toLowerCase().includes(searchLower) ||
      String(record['Number of Tankers Discharged:'] || '').includes(searchLower)
    );
  });

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  // Format numbers
  const formatNumber = (num: number | null) => {
    if (num === null) return 'N/A';
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading STP Plant data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="!p-6 max-w-md">
          <div className="flex items-center gap-3 text-red-600 dark:text-red-400">
            <AlertCircle size={24} />
            <div>
              <h3 className="font-bold text-lg">Error Loading Data</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold">STP Plant Database - Complete Records</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Showing {filteredRecords.length} of {records.length} records
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <RefreshCw size={18} />
              Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by date or tanker count..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">Date</th>
                <th className="px-4 py-3 whitespace-nowrap">Tankers</th>
                <th className="px-4 py-3 whitespace-nowrap">Expected Volume (m³)</th>
                <th className="px-4 py-3 whitespace-nowrap">Direct Sewage (MB)</th>
                <th className="px-4 py-3 whitespace-nowrap">Total Inlet (m³)</th>
                <th className="px-4 py-3 whitespace-nowrap">TSE Produced (m³)</th>
                <th className="px-4 py-3 whitespace-nowrap">H430:J443</th>
                <th className="px-4 py-3 whitespace-nowrap">Tanker Income (OMR)</th>
                <th className="px-4 py-3 whitespace-nowrap">TSE Savings (OMR)</th>
                <th className="px-4 py-3 whitespace-nowrap">Total Impact (OMR)</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((record, index) => (
                  <tr
                    key={index}
                    className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap font-medium">{record.J361 || 'N/A'}</td>
                    <td className="px-4 py-3 text-center">{formatNumber(record['Number of Tankers Discharged:'])}</td>
                    <td className="px-4 py-3 text-right">{formatNumber(record['Expected Tanker Volume (m³) (20 m3)'])}</td>
                    <td className="px-4 py-3 text-right">{formatNumber(record['Direct In line Sewage (MB)'])}</td>
                    <td className="px-4 py-3 text-right font-semibold text-blue-600 dark:text-blue-400">
                      {formatNumber(record['Total Inlet Sewage Received from (MB+Tnk) -m³'])}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-green-600 dark:text-green-400">
                      {formatNumber(record['Total Treated Water Produced - m³'])}
                    </td>
                    <td className="px-4 py-3 text-right">{formatNumber(record['H430:J443'])}</td>
                    <td className="px-4 py-3 text-right text-purple-600 dark:text-purple-400">
                      {formatNumber(record['Income from Tankers (OMR)'])}
                    </td>
                    <td className="px-4 py-3 text-right text-teal-600 dark:text-teal-400">
                      {formatNumber(record['Saving from TSE (OMR)'])}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-orange-600 dark:text-orange-400">
                      {formatNumber(record['Total Saving & Income (OMR)'])}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    No records found matching your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DetailsData;