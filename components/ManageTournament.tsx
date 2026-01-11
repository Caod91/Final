
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreVertical, Terminal, Database, ShieldAlert } from 'lucide-react';

const mockTournaments = [
  { id: '1', name: 'ASHES_SR_2024', type: 'SERIES', teams: 2, status: 'ACTIVE', date: '2024.01.20' },
  { id: '2', name: 'BORDER_GAVASKAR', type: 'SERIES', teams: 2, status: 'QUEUE', date: '2024.03.15' },
  { id: '3', name: 'LEGENDS_QUAD', type: 'LEAGUE', teams: 4, status: 'ARCHIVED', date: '2023.12.10' },
];

export const ManageTournament: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-8 border-b-8 border-black pb-8">
        <div>
          <div className="flex items-center gap-4 text-[#ff0000] mb-2">
            <Database size={32} />
            <span className="font-black text-xl tracking-tighter">LIVE_DATA_FEED</span>
          </div>
          <h2 className="text-8xl font-black tracking-tighter">MANAGE_DB</h2>
        </div>
        
        <div className="flex items-stretch gap-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={24} />
            <input 
              type="text" 
              placeholder="SEARCH_RECORDS..." 
              className="brutalist-input w-full pl-14 pr-6 py-4 bg-white"
            />
          </div>
          <button className="bg-black text-white p-4 brutalist-border hover:bg-[#00ff00] hover:text-black transition-colors">
            <Filter size={32} strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto brutalist-border brutalist-shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-6 text-2xl font-black border-r-4 border-white uppercase">ID_REF</th>
              <th className="p-6 text-2xl font-black border-r-4 border-white uppercase">TYPE</th>
              <th className="p-6 text-2xl font-black border-r-4 border-white uppercase">NODE_CNT</th>
              <th className="p-6 text-2xl font-black border-r-4 border-white uppercase">STATUS</th>
              <th className="p-6 text-2xl font-black border-r-4 border-white uppercase">TIMESTAMP</th>
              <th className="p-6 border-white"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {mockTournaments.map((t, idx) => (
              <motion.tr 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.05 }}
                key={t.id} 
                className="group border-b-4 border-black hover:bg-[#00ff00] transition-colors"
              >
                <td className="p-6 border-r-4 border-black">
                  <div className="flex items-center gap-4">
                    <Terminal size={24} className="text-[#ff0000] group-hover:text-black" />
                    <span className="text-3xl font-black">{t.name}</span>
                  </div>
                </td>
                <td className="p-6 border-r-4 border-black text-xl font-bold">{t.type}</td>
                <td className="p-6 border-r-4 border-black">
                  <span className="bg-black text-white px-3 py-1 text-2xl font-black">{t.teams}</span>
                </td>
                <td className="p-6 border-r-4 border-black">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 brutalist-border font-black text-lg ${
                    t.status === 'ACTIVE' ? 'bg-[#00ff00]' : 
                    t.status === 'QUEUE' ? 'bg-[#ffff00]' : 'bg-gray-200'
                  }`}>
                    {t.status === 'ACTIVE' && <div className="w-3 h-3 bg-red-600 animate-pulse" />}
                    {t.status}
                  </div>
                </td>
                <td className="p-6 border-r-4 border-black font-black text-xl font-mono">{t.date}</td>
                <td className="p-6 text-right">
                  <button className="p-4 hover:bg-black hover:text-white transition-colors">
                    <MoreVertical size={32} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 p-8 bg-black text-white brutalist-border flex items-center justify-between">
        <div className="flex items-center gap-6">
          <ShieldAlert size={48} className="text-[#ff0000]" />
          <div>
            <h4 className="text-2xl font-black">CRITICAL_OVERVIEW</h4>
            <p className="font-bold opacity-60">System monitoring active. No anomalies detected in current league cycles.</p>
          </div>
        </div>
        <button className="bg-white text-black p-4 font-black hover:bg-[#ff0000] hover:text-white transition-all">REFRESH_SYNC</button>
      </div>
    </div>
  );
};
