import React from 'react';

const AdminPlaceholder = ({ title, description }: { title: string, description: string }) => (
  <div className="max-w-6xl mx-auto h-[60vh] flex flex-col items-center justify-center text-center">
    <h1 className="text-3xl font-display mb-2 text-white">{title}</h1>
    <p className="text-akira-muted font-sans text-sm max-w-md">{description}</p>
    <div className="mt-8 border border-dashed border-white/20 rounded-xl w-full max-w-3xl h-64 flex items-center justify-center text-white/20 font-mono text-sm tracking-widest uppercase">
      Module Locked // Pending Configuration
    </div>
  </div>
);

export const AdminSources = () => <AdminPlaceholder title="Source Management" description="Configure streaming servers, manage HLS instances, and set failover fallbacks." />;
export const AdminMedia = () => <AdminPlaceholder title="Media Library" description="Upload and organize posters, hero banners, and subtitle assets." />;
export const AdminUsers = () => <AdminPlaceholder title="User Management" description="View registered users, manage roles, and review moderation logs." />;
export const AdminAnalytics = () => <AdminPlaceholder title="Analytics" description="Deep insights into playback trends, bandwidth usage, and user engagement." />;
export const AdminSettings = () => <AdminPlaceholder title="Platform Settings" description="Configure global platform variables, maintenance modes, and security policies." />;
