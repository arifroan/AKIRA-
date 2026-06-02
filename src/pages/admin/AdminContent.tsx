import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { MOCK_ANIMES } from '../../data';

export const AdminContent = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display mb-1 text-white">Content Library</h1>
          <p className="text-akira-muted font-sans text-sm">Manage Anime series, movies, and episodes.</p>
        </div>
        <button className="bg-akira-primary hover:bg-akira-primary-hover px-6 py-2.5 rounded text-white flex items-center gap-2 font-semibold tracking-wide transition-colors">
          <Plus className="w-4 h-4" />
          Add Title
        </button>
      </div>

      <div className="flex gap-4 mb-6 border-b border-white/5 pb-1">
        {['All', 'Series', 'Movies', 'Drafts'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-2 text-sm font-medium tracking-wide border-b-2 transition-colors ${
              activeTab === tab 
                ? 'text-akira-primary border-akira-primary' 
                : 'text-akira-muted border-transparent hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-[#111] border border-white/5 rounded-lg overflow-hidden">
        <table className="w-full text-left font-sans">
          <thead className="bg-[#1a1a1a] text-akira-muted text-xs uppercase tracking-widest border-b border-white/5">
            <tr>
              <th className="px-6 py-4 font-medium">Title</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm">
            {MOCK_ANIMES.map((anime) => (
              <tr key={anime.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img src={anime.coverImage} alt={anime.title.romaji} className="w-10 h-14 object-cover rounded shadow-md" />
                    <div>
                      <div className="font-semibold text-white mb-0.5">{anime.title.english || anime.title.romaji}</div>
                      <div className="text-xs text-akira-muted">Season {anime.seasonYear || '2024'} • {anime.format}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-akira-muted">{anime.format}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    anime.status === 'Ongoing' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
                    anime.status === 'Completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                    'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                  }`}>
                    {anime.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-akira-muted hover:text-white hover:bg-white/10 rounded transition-colors" title="Edit">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-akira-muted hover:text-akira-primary hover:bg-akira-primary/10 rounded transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
