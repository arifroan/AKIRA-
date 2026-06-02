import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Pause, ArrowLeft, Settings, Maximize, SkipForward, Volume2, MessageSquare, VolumeX, FastForward } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

export const Player = () => {
  const { id } = useParams<{ id: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [anime, setAnime] = useState<any>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [selectedSource, setSelectedSource] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Player state
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  let controlsTimeout: NodeJS.Timeout;

  useEffect(() => {
    const fetchAnimeAndSources = async () => {
      if (!id) return;
      try {
        const animeRef = doc(db, 'anime', id);
        const animeSnap = await getDoc(animeRef);
        if (animeSnap.exists()) {
          setAnime({ id: animeSnap.id, ...animeSnap.data() });
        }
        
        const sourcesSnap = await getDocs(collection(db, `anime/${id}/sources`));
        const srcList = sourcesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        setSources(srcList);
        
        if (srcList.length > 0) {
          const mainSrc = srcList.find(s => s.isPrimary) || srcList[0];
          setSelectedSource(mainSrc);
        }
      } catch (error) {
        console.error("Failed to load player data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnimeAndSources();
  }, [id]);

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeout);
    if (isPlaying) {
      controlsTimeout = setTimeout(() => setShowControls(false), 3000);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(p);
    }
  };

  if (loading) {
     return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Player...</div>;
  }

  if (!anime) {
     return <div className="min-h-screen bg-black flex items-center justify-center text-white">Content not found.</div>;
  }

  const isYouTube = selectedSource?.type === 'youtube';

  return (
    <div 
      ref={containerRef} className="fixed inset-0 bg-black z-50 flex flex-col font-sans"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center cursor-pointer group" onClick={togglePlay}>

        {/* Video Renderer */}
        {selectedSource ? (
            isYouTube ? (
                <iframe
                    title="YouTube Player"
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedSource.url.split('v=')[1]?.split('&')[0]}?autoplay=1&controls=1&modestbranding=1&rel=0`}
                    allowFullScreen
                    allow="autoplay; encrypted-media"
                />
            ) : (
                <video
                  ref={videoRef}
                  src={selectedSource.url}
                  className="w-full h-full object-contain"
                  onTimeUpdate={handleTimeUpdate}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  autoPlay
                />
            )
        ) : (
            <div className="text-akira-muted uppercase tracking-widest text-sm font-bold">No video source available. Add sources from Admin Panel.</div>
        )}
        
        {/* Controls Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
          
          <div className="absolute top-0 inset-x-0 p-8 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
            <div className="flex items-center gap-6">
              <Link to="/" className="p-3 bg-black/40 hover:bg-white/20 rounded-full backdrop-blur-md transition-colors border border-white/10" onClick={(e) => e.stopPropagation()}>
                <ArrowLeft className="w-6 h-6 text-white" />
              </Link>
              <div>
                <h2 className="font-display text-2xl text-white font-medium drop-shadow-md">{anime.title}</h2>
                <p className="text-akira-muted uppercase tracking-widest text-[10px] font-bold mt-1">
                   {selectedSource ? `${selectedSource.label} • ${selectedSource.type.toUpperCase()}` : 'No Source'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
               {/* Source Selector */}
               {sources.length > 1 && (
                   <div className="flex bg-white/10 rounded overflow-hidden mr-4">
                      {sources.map(src => (
                          <button 
                             key={src.id}
                             onClick={(e) => { e.stopPropagation(); setSelectedSource(src); }}
                             className={`px-3 py-1.5 text-[10px] font-bold uppercase transition-colors tracking-widest ${selectedSource?.id === src.id ? 'bg-akira-primary text-white' : 'text-white/50 hover:bg-white/20'}`}
                          >
                              {src.label}
                          </button>
                      ))}
                  </div>
               )}
              
              <button className="p-3 hover:bg-white/20 rounded-full text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                 <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>

          {!isPlaying && !isYouTube && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center shadow-lg backdrop-blur-md">
                <Play className="w-10 h-10 text-white fill-current ml-2" />
              </div>
            </div>
          )}

          {!isYouTube && (
              <div className="absolute bottom-0 inset-x-0 p-8 pt-24 bg-gradient-to-t from-black to-transparent flex flex-col gap-6 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                <div className="w-full flex items-center gap-4">
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full cursor-pointer relative" onClick={(e) => {
                      if (!videoRef.current) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      videoRef.current.currentTime = pos * videoRef.current.duration;
                  }}>
                    <div className="h-full bg-akira-primary relative transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}>
                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(242,61,70,0.8)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-8">
                    <button onClick={togglePlay} className="hover:text-akira-primary transition-colors focus:outline-none">
                      {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
                    </button>
                    <button className="hover:text-akira-primary transition-colors focus:outline-none">
                      <FastForward className="w-6 h-6 fill-current" />
                    </button>
                    <button onClick={() => {
                        if (videoRef.current) {
                            videoRef.current.muted = !isMuted;
                            setIsMuted(!isMuted);
                        }
                    }} className="flex items-center gap-3 hover:text-akira-primary transition-colors cursor-pointer focus:outline-none">
                      {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                    </button>
                  </div>

                  <div className="flex items-center gap-8">
                    <button onClick={toggleFullscreen} className="hover:text-akira-primary transition-colors focus:outline-none">
                      <Maximize className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
          )}

        </div>
      </div>
    </div>
  );
};
