import React, { useState, useEffect } from 'react';
import { db, storage } from '../../lib/firebase';
import { collection, getDocs, addDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Plus, Trash2, Video, Upload, Link as LinkIcon } from 'lucide-react';

export const AdminSources = () => {
    const [animes, setAnimes] = useState<any[]>([]);
    const [selectedAnime, setSelectedAnime] = useState<string>('');
    const [sources, setSources] = useState<any[]>([]);
    
    // Form
    const [type, setType] = useState('youtube');
    const [label, setLabel] = useState('1080p');
    const [url, setUrl] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAnimes = async () => {
            const snap = await getDocs(collection(db, 'anime'));
            setAnimes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        };
        fetchAnimes();
    }, []);

    useEffect(() => {
        if (selectedAnime) {
            fetchSources();
        } else {
            setSources([]);
        }
    }, [selectedAnime]);

    const fetchSources = async () => {
        if (!selectedAnime) return;
        const snap = await getDocs(collection(db, `anime/${selectedAnime}/sources`));
        setSources(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedAnime) return alert("Select an anime first");

        setLoading(true);
        try {
            let finalUrl = url;
            if (type === 'direct' && file) {
                // Method 3: Direct Device Upload
                const storageRef = ref(storage, `sources/${selectedAnime}/${Date.now()}_${file.name}`);
                const snapshot = await uploadBytes(storageRef, file);
                finalUrl = await getDownloadURL(snapshot.ref);
            }

            await addDoc(collection(db, `anime/${selectedAnime}/sources`), {
                animeId: selectedAnime,
                type,
                url: finalUrl,
                label,
                isPrimary: sources.length === 0,
                createdAt: serverTimestamp()
            });

            setUrl('');
            setFile(null);
            fetchSources();
        } catch (error: any) {
            console.error("Upload error", error);
            alert("Error: Make sure Firebase Storage is enabled. " + error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id: string) => {
        if (window.confirm("Delete source?")) {
            await deleteDoc(doc(db, `anime/${selectedAnime}/sources`, id));
            fetchSources();
        }
    }

    return (
        <div className="animate-fade-in font-sans">
            <h1 className="text-3xl font-display font-medium text-white mb-2 tracking-wider">Source Management</h1>
            <p className="text-sm text-akira-muted mb-8">Manage video sources (YouTube, HLS, MP4, Direct Upload).</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Form */}
                <div className="bg-akira-card rounded-xl p-6 border border-white/5 h-fit">
                    <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Add New Source</h2>
                    
                    <form onSubmit={handleSave} className="flex flex-col gap-5 text-sm">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Select Anime</label>
                            <select required value={selectedAnime} onChange={e => setSelectedAnime(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-akira-primary transition-colors">
                                <option value="">-- Choose Anime --</option>
                                {animes.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Source Type</label>
                            <select value={type} onChange={e => {setType(e.target.value); setFile(null);}} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-akira-primary transition-colors">
                                <option value="youtube">Method 1: YouTube URL</option>
                                <option value="hls">Method 2: HLS (.m3u8)</option>
                                <option value="mp4">Method 2: MP4 URL</option>
                                <option value="direct">Method 3: Direct Upload</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Quality Label</label>
                            <select value={label} onChange={e => setLabel(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-akira-primary transition-colors">
                                <option value="1080p">1080p</option>
                                <option value="720p">720p</option>
                                <option value="480p">480p</option>
                                <option value="Raw">Raw</option>
                            </select>
                        </div>

                        {type === 'direct' ? (
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Upload Video (MP4, WEBM)</label>
                                <input type="file" accept="video/mp4,video/webm" required onChange={e => setFile(e.target.files?.[0] || null)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white text-sm" />
                            </div>
                        ) : (
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-akira-muted mb-2">Source URL</label>
                                <input type="url" required value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-akira-primary transition-colors" />
                            </div>
                        )}
                        
                        <button type="submit" disabled={loading || !selectedAnime || (type === 'direct' && !file)} className="flex items-center justify-center gap-3 bg-akira-primary hover:bg-akira-primary-hover text-white px-6 py-4 rounded-lg font-bold uppercase tracking-widest text-xs transition-colors shadow disabled:opacity-50 mt-2">
                            {type === 'direct' ? <Upload className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                            {loading ? 'Uploading & Processing...' : 'Save Source'}
                        </button>
                    </form>
                </div>

                {/* Right: Sources List */}
                <div className="bg-akira-card rounded-xl p-6 border border-white/5">
                    <h2 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Existing Sources</h2>
                    
                    {!selectedAnime ? (
                        <div className="text-center text-akira-muted text-sm py-12">Select an anime to view sources.</div>
                    ) : sources.length === 0 ? (
                        <div className="text-center text-akira-muted text-sm py-12">No sources available.</div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {sources.map(src => (
                                <div key={src.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                            <Video className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-bold uppercase tracking-widest text-xs">{src.label}</span>
                                                <span className="text-[10px] bg-akira-primary/20 text-akira-primary px-2 py-0.5 rounded uppercase font-bold">{src.type}</span>
                                            </div>
                                            <p className="text-akira-muted text-xs truncate max-w-[200px] mt-1">{src.url}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete(src.id)} className="text-white/50 hover:text-red-500 transition-colors p-2">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
