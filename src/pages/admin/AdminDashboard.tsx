import React from 'react';
import { Users, Film, PlayCircle, Eye } from 'lucide-react';

export const AdminDashboard = () => {
    return (
        <div className="animate-fade-in">
           <h1 className="text-3xl font-display font-medium text-white mb-8 tracking-wider">Dashboard Overview</h1>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
               {[
                   { title: 'Total Anime', value: '42', icon: <Film className="w-6 h-6 text-akira-primary" /> },
                   { title: 'Total Episodes', value: '528', icon: <PlayCircle className="w-6 h-6 text-orange-500" /> },
                   { title: 'Registered Users', value: '1,204', icon: <Users className="w-6 h-6 text-blue-500" /> },
                   { title: 'Total Views', value: '84.2K', icon: <Eye className="w-6 h-6 text-green-500" /> }
               ].map((stat, i) => (
                   <div key={i} className="bg-akira-card rounded-xl p-6 border border-white/5 relative overflow-hidden group">
                       <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                       <div className="flex items-start justify-between relative z-10">
                           <div>
                               <p className="text-akira-muted uppercase tracking-widest text-[10px] font-bold mb-1">{stat.title}</p>
                               <p className="text-3xl font-display text-white">{stat.value}</p>
                           </div>
                           <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center border border-white/5">
                               {stat.icon}
                           </div>
                       </div>
                   </div>
               ))}
           </div>
        </div>
    )
}
