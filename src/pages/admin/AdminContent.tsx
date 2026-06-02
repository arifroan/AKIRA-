import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { AnimeFormModal } from '../../components/admin/AnimeFormModal';

export const AdminContent = () => {
    const [animes, setAnimes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingAnime, setEditingAnime] = useState<any>(null);

    useEffect(() => {
        fetchAnimes();
    }, []);

    const fetchAnimes = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'anime'));
            const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAnimes(list);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching anime:", error);
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if(window.confirm('Are you sure you want to delete this content?')) {
            try {
                await deleteDoc(doc(db, 'anime', id));
                fetchAnimes();
            } catch (error) {
                console.error("Error deleting anime", error);
                alert("Failed to delete");
            }
        }
    }

    const openEdit = (anime: any) => {
        setEditingAnime(anime);
        setShowModal(true);
    }

    const handleSaved = () => {
        setShowModal(false);
        setEditingAnime(null);
        fetchAnimes();
    }

    return (
        <div className="animate-fade-in font-sans">
            <div className="flex items-center justify-between mb-8">
                <div>
                   <h1 className="text-3xl font-display font-medium text-white mb-2 tracking-wider">Content Management</h1>
                   <p className="text-sm text-akira-muted">Manage all anime series and movies.</p>
                </div>
                <button 
                  onClick={() => { setEditingAnime(null); setShowModal(true); }}
                  className="flex items-center gap-2 bg-akira-primary hover:bg-akira-primary-hover text-white px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-xs transition-colors shadow"
                >
                    <Plus className="w-4 h-4" />
                    Add Content
                </button>
            </div>

            <div className="bg-akira-card rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full text-left text-sm text-akira-muted">
                    <thead className="bg-black/50 text-[10px] uppercase tracking-widest text-white/70 border-b border-white/5">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Title</th>
                            <th className="px-6 py-4 font-semibold">Type</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center">Loading...</td>
                            </tr>
                        )}
                        {!loading && animes.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-white/50">No content found.</td>
                            </tr>
                        )}
                        {animes.map((anime) => (
                            <tr key={anime.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        {anime.posterImage ? (
                                            <img src={anime.posterImage} alt={anime.title} className="w-10 h-14 object-cover rounded shadow border border-white/5" />
                                        ) : (
                                            <div className="w-10 h-14 bg-white/5 rounded border border-white/5 flex items-center justify-center text-[10px]">No Img</div>
                                        )}
                                        <div className="font-semibold text-white">{anime.title}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-mono">{anime.type}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-akira-primary/20 text-akira-primary px-2 py-1 rounded text-[10px] font-bold uppercase">{anime.status}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-3 text-white/50">
                                        <button onClick={() => openEdit(anime)} className="hover:text-white transition-colors"><Edit2 className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(anime.id)} className="hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <AnimeFormModal 
                   onClose={() => {setShowModal(false); setEditingAnime(null);}} 
                   onSaved={handleSaved} 
                   editingAnime={editingAnime} 
                />
            )}
        </div>
    )
}
