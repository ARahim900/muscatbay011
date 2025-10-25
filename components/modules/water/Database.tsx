import React, { useState, useEffect } from 'react';
import Card from '../../ui/Card';
import { Search } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

// Define the shape of our water meter data
interface WaterMeter {
    id: number;
    label: string;
    account: string;
    type: string;
    zone: string;
    consumption: string;
    status: string;
}

const Database: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [meters, setMeters] = useState<WaterMeter[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWaterMeters = async () => {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('water_meters')
                .select('*');

            if (error) {
                console.error('Error fetching data from Supabase:', error);
                setError('Failed to load water meter data. Please ensure a "water_meters" table exists and Realtime is enabled.');
            } else {
                setMeters(data || []);
            }
            setLoading(false);
        };

        fetchWaterMeters();

        const channel = supabase
            .channel('water_meters_changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'water_meters' },
                (payload) => {
                    const newRecord = payload.new as WaterMeter;
                    const oldRecord = payload.old as { id: number };

                    if (payload.eventType === 'INSERT') {
                        setMeters((currentMeters) => [...currentMeters, newRecord]);
                    } else if (payload.eventType === 'UPDATE') {
                        setMeters((currentMeters) =>
                            currentMeters.map((meter) =>
                                meter.id === newRecord.id ? newRecord : meter
                            )
                        );
                    } else if (payload.eventType === 'DELETE') {
                         setMeters((currentMeters) =>
                            currentMeters.filter((meter) => meter.id !== oldRecord.id)
                        );
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const filteredMeters = meters.filter(meter =>
        meter.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meter.account.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const renderTableContent = () => {
        if (loading) {
            return (
                <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500 dark:text-gray-400">
                        Loading water meter data...
                    </td>
                </tr>
            );
        }

        if (error) {
            return (
                <tr>
                    <td colSpan={6} className="text-center py-10 text-red-500">
                        {error}
                    </td>
                </tr>
            );
        }

        if (filteredMeters.length === 0) {
            return (
                <tr>
                    <td colSpan={6} className="text-center py-10 text-gray-500 dark:text-gray-400">
                        {meters.length === 0 ? "No water meters found in the database." : "No meters found matching your search."}
                    </td>
                </tr>
            );
        }
        
        return filteredMeters.map((row) => (
            <tr key={row.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{row.label}</th>
                <td className="px-6 py-4">{row.account}</td>
                <td className="px-6 py-4"><span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-1 rounded-full dark:bg-cyan-900 dark:text-cyan-300">{row.type}</span></td>
                <td className="px-6 py-4">{row.zone}</td>
                <td className="px-6 py-4 font-semibold text-gray-800 dark:text-white">{row.consumption}</td>
                <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${row.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                        {row.status}
                    </span>
                </td>
            </tr>
        ));
    };


    return (
        <Card>
            <div className="mb-6">
                 <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold">Water Meter Database ({loading ? '...' : filteredMeters.length} / {loading ? '...' : meters.length})</h3>
                     {!loading && !error && (
                         <span className="flex items-center gap-1.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            LIVE
                        </span>
                    )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Search and manage all water meters</p>
            </div>
            
            <div className="mb-4">
                <div className="relative max-w-sm">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Label or Account #"
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        disabled={loading || !!error}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                           {['Meter Label', 'Account #', 'Type', 'Zone', 'Consumption (Total)', 'Status'].map(h => 
                            <th key={h} scope="col" className="px-6 py-3">{h}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                       {renderTableContent()}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default Database;