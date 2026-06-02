import React, { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { AnimeCard } from '../components/AnimeCard';
import { Search } from 'lucide-react';

export const Library = () => {
    const [animes, setAnimes] = useState<any[]>([]);
    const [filtered, setFiltered] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const q = query(collection(db, 'anime'), orderBy('title', 'asc'));
                const snap = await getDocs(q);
                const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAnimes(list);
                setFiltered(list);
            } catch(e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    useEffect(() => {
        if (search) {
            setFiltered(animes.filter(a => a.title.toLowerCase().includes(search.toLowerCase())));
        } else {
            setFiltered(animes);
        }
    }, [search, animes]);

    return (
        <div className="min-h-screen bg-akira-dark pt-32 px-6 lg:px-12 max-w-[1600px] mx-auto font-sans animate-fade-in relative z-10 pb-20">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
                <div>
                   <h1 className="text-4xl md:text-5xl font-display text-white mb-2 tracking-wider">Library</h1>
                   <p className="text-akira-muted text-sm font-medium">Explore the entire AKIRA universe.</p>
                </div>
                <div className="relative w-full md:w-auto">
                    <Search className="w-5 h-5 text-akira-muted absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                        type="text" 
                        placeholder="Search sequence..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full md:w-[300px] bg-black/50 border border-white/10 rounded-full pl-12 pr-6 py-3 text-white placeholder-white/20 focus:outline-none focus:border-akira-primary transition-colors text-sm font-bold uppercase tracking-widest"
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-akira-muted uppercase tracking-widest text-sm font-bold flex items-center justify-center py-20">Loading Database...</div>
            ) : filtered.length === 0 ? (
                <div className="text-akira-muted uppercase tracking-widest text-sm font-bold flex flex-col items-center justify-center py-20 text-center">
                    <p className="mb-4">No content found matching "{search}"</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filtered.map(anime => (
                        <div key={anime.id} className="w-full">
                            <AnimeCard anime={anime} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
