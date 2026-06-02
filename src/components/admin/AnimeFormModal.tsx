import React, { useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { X } from 'lucide-react';

export const AnimeFormModal = ({ onClose, onSaved, editingAnime }: { onClose: () => void, onSaved: () => void, editingAnime?: any }) => {
    const [formData, setFormData] = useState({
        title: editingAnime?.title || '',
        description: editingAnime?.description || '',
        genres: editingAnime?.genres?.join(', ') || '',
        studio: editingAnime?.studio || '',
        type: editingAnime?.type || 'Series',
        releaseDate: editingAnime?.releaseDate || '',
        status: editingAnime?.status || 'Ongoing',
        posterImage: editingAnime?.posterImage || '',
        bannerImage: editingAnime?.bannerImage || '',
        trailer: editingAnime?.trailer || ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToSave = {
                ...formData,
                genres: formData.genres.split(',').map((g: string) => g.trim()).filter(Boolean),
                updatedAt: serverTimestamp()
            };

            if (editingAnime?.id) {
                await updateDoc(doc(db, 'anime', editingAnime.id), dataToSave);
            } else {
                await addDoc(collection(db, 'anime'), {
                    ...dataToSave,
                    createdAt: serverTimestamp()
                });
            }
            onSaved();
        } catch (error) {
            console.error(error);
            alert("Failed to save anime: " + (error as Error).message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-akira-card border border-white/10 rounded-2xl w-full max-w-2xl mt-12 mb-12">
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="text-xl font-display font-medium text-white">{editingAnime ? 'Edit' : 'Add'} Content</h2>
                    <button onClick={onClose} className="text-white/50 hover:text-white"><X className="w-5 h-5" /></button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Title</label>
                            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-akira-primary transition-colors text-sm" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Description</label>
                            <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-akira-primary transition-colors text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Type</label>
                            <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-akira-primary transition-colors text-sm">
                                <option value="Series">Series</option>
                                <option value="Movie">Movie</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Status</label>
                            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-akira-primary transition-colors text-sm">
                                <option value="Ongoing">Ongoing</option>
                                <option value="Completed">Completed</option>
                                <option value="Upcoming">Upcoming</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Genres (comma separated)</label>
                            <input type="text" value={formData.genres} onChange={e => setFormData({...formData, genres: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-akira-primary transition-colors text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Studio</label>
                            <input type="text" value={formData.studio} onChange={e => setFormData({...formData, studio: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-akira-primary transition-colors text-sm" />
                        </div>
                        <div className="col-span-2">
                             <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Release Date</label>
                             <input type="date" value={formData.releaseDate} onChange={e => setFormData({...formData, releaseDate: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-akira-primary transition-colors text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Poster Image URL</label>
                            <input type="url" value={formData.posterImage} onChange={e => setFormData({...formData, posterImage: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-akira-primary transition-colors text-sm" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Banner Image URL</label>
                            <input type="url" value={formData.bannerImage} onChange={e => setFormData({...formData, bannerImage: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-akira-primary transition-colors text-sm" />
                        </div>
                        <div className="col-span-2">
                             <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Trailer URL (YouTube)</label>
                             <input type="url" value={formData.trailer} onChange={e => setFormData({...formData, trailer: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-akira-primary transition-colors text-sm" />
                        </div>
                    </div>
                    
                    <div className="mt-6 flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-lg text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">Cancel</button>
                        <button type="submit" disabled={loading} className="px-6 py-3 rounded-lg bg-akira-primary text-white font-bold uppercase tracking-widest text-xs hover:bg-akira-primary-hover shadow transition-colors disabled:opacity-50">
                            {loading ? 'Saving...' : 'Save Content'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
