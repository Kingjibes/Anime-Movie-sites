import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, ListMusic, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider'; // Assuming you have a Slider component

const defaultSongs = [
  { title: 'MONTAGEM_BAILÃO', src: '/music/MONTAGEM_BAILÃO.mp3', artist: 'phonk' },
  { title: 'Nollypiano', src: '/music/Nollypiano.mp3', artist: 'Christ effect' },
  { title: 'LOS_VOLTAJE_Slowed', src: '/music/LOS_VOLTAJE_Slowed.mp3', artist: 'Phonk' },
  { title: 'Eternxlkz_-_BRODYAGA_FUNK', src: '/music/Eternxlkz_-_BRODYAGA_FUNK_Official_Audio.mp3', artist: 'PureOjuice' },
  { title: 'Demon_Slayer_Akaza_Uk_Drill_Rengoku_Diss', src: '/music/Pureojuice_-_Blakaza_Demon_Slayer_Akaza_Uk_Drill_Rengoku_Diss_MusicalityMusic.mp3', artist: 'PureOjuice' },
  { title: 'Gear_5_Luffy_UK_Drill_(One_Piece)', src: '/music/Gear_5_Luffy_UK_Drill_One_Piece_Kaido_Diss_Drums_Of_Liberation.mp3', artist: 'PureOjuice' },
   { title: 'DEMON_SLAYER_UK_DRILL', src: '/music/DEMON_SLAYER_UK_DRILL.mp3', artist: 'PureOjuice' },
];

const MusicPlayer = () => {
  const [songs, setSongs] = useState(defaultSongs);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isPlayerVisible, setIsPlayerVisible] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => console.error("Error playing audio:", error));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);
  
  useEffect(() => {
    const audioElement = audioRef.current;
    const handleEnded = () => nextSong();
    if (audioElement) {
      audioElement.addEventListener('ended', handleEnded);
    }
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('ended', handleEnded);
      }
    };
  }, [currentSongIndex, songs.length]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume[0]);
    if (isMuted && newVolume[0] > 0) setIsMuted(false);
    if (newVolume[0] === 0 && !isMuted) setIsMuted(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };

  const selectSong = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    setShowPlaylist(false);
  };
  
  const currentSong = songs[currentSongIndex];

  if (!isPlayerVisible) {
    return (
      <motion.div
        className="fixed bottom-4 right-4 z-[100]"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Button onClick={() => setIsPlayerVisible(true)} variant="outline" size="icon" className="rounded-full shadow-lg bg-primary/80 text-primary-foreground hover:bg-primary">
          <ListMusic className="h-5 w-5" />
        </Button>
      </motion.div>
    );
  }

  return (
    <>
      <audio ref={audioRef} src={currentSong?.src} preload="metadata" />
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
        className="fixed bottom-4 right-4 z-[100] p-4 rounded-lg shadow-2xl glassmorphism w-80 border border-primary/30"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="overflow-hidden">
            <motion.p 
              key={currentSong?.title}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-sm font-semibold text-foreground truncate"
            >
              {currentSong?.title || "No song selected"}
            </motion.p>
            <p className="text-xs text-muted-foreground truncate">{currentSong?.artist || "Unknown Artist"}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsPlayerVisible(false)} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-around space-x-2 mb-3">
          <Button variant="ghost" size="icon" onClick={prevSong} className="text-foreground hover:text-primary">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button variant="default" size="icon" onClick={togglePlayPause} className="bg-primary text-primary-foreground rounded-full w-10 h-10 hover:bg-primary/90 animate-pulse-glow">
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={nextSong} className="text-foreground hover:text-primary">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center space-x-2 mb-2">
          <Button variant="ghost" size="icon" onClick={toggleMute} className="text-foreground hover:text-primary">
            {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <Slider
            defaultValue={[volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-primary"
            aria-label="Volume control"
          />
        </div>
        
        <Button variant="outline" size="sm" className="w-full mt-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => setShowPlaylist(!showPlaylist)}>
          <ListMusic className="h-4 w-4 mr-2" /> {showPlaylist ? 'Hide Playlist' : 'Show Playlist'}
        </Button>

        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 max-h-32 overflow-y-auto rounded-md border border-border p-2 bg-background/50"
            >
              {songs.map((song, index) => (
                <motion.button
                  key={index}
                  onClick={() => selectSong(index)}
                  className={`w-full text-left p-1.5 rounded-md text-xs ${index === currentSongIndex ? 'bg-primary/30 text-primary font-semibold' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}
                  whileHover={{ x: 2 }}
                >
                  {song.title} - <span className="text-xs opacity-70">{song.artist}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default MusicPlayer;
