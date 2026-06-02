import React from 'react';
import { Film, Users, PlayCircle, HardDrive } from 'lucide-react';

const StatCard = ({ title, value, label, icon: Icon, color }: any) => (
  <div className="bg-[#111] border border-white/5 p-6 rounded-lg relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700`}></div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`p-3 rounded-lg bg-${color}-500/10 text-${color}-500`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-3xl font-display text-white mb-1">{value}</h3>
      <p className="text-akira-muted font-sans text-sm">{title}</p>
      {label && <p className="text-xs text-green-500 mt-2 font-mono">{label}</p>}
    </div>
  </div>
);

export const AdminDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-display mb-1 text-white">System Overview</h1>
        <p className="text-akira-muted text-sm">Real-time platform metrics and status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Series" value="84" label="+3 this week" icon={Film} color="akira-primary" />
        <StatCard title="Active Users" value="12,492" label="+420 this week" icon={Users} color="blue" />
        <StatCard title="Total Sources" value="1,023" label="All sources healthy" icon={HardDrive} color="green" />
        <StatCard title="Streams Today" value="45.2K" label="+12% from yesterday" icon={PlayCircle} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111] border border-white/5 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                <div className="w-2 h-2 rounded-full bg-akira-primary"></div>
                <div className="flex-1">
                  <p className="text-sm text-white">Super Admin <span className="text-akira-muted">updated</span> Heavenly Embers</p>
                  <p className="text-xs text-akira-muted mt-1 font-mono">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#111] border border-white/5 rounded-lg p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-4">System Health</h2>
          <div className="flex-1 flex flex-col justify-center items-center gap-4">
             <div className="w-32 h-32 rounded-full border-4 border-green-500/20 border-t-green-500 flex items-center justify-center animate-spin-slow">
                <div className="w-24 h-24 rounded-full border border-green-500/10 flex items-center justify-center -animate-none relative">
                   <div className="absolute inset-0 bg-green-500/5 rounded-full blur-md"></div>
                   <span className="font-mono text-green-500 text-xl font-bold shadow-green-500">99.9%</span>
                </div>
             </div>
             <p className="text-akira-muted text-sm text-center">All systems operational.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
