"use client";

import {
  Music,
  Heart,
  PlayCircle,
  Headphones,
  Star,
  TrendingUp,
  Search,
  Play,
  List,
  User,
  Volume2,
  SkipBack,
  SkipForward,
  Pause,
  Shuffle,
  Repeat,
  Plus,
  Clock,
  Home,
  Library,
  PlusCircle,
  UserPlus,
  MoreHorizontal,
  Menu,
  X,
  VolumeX,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { useState, useEffect, useRef } from "react";
import Navbar from "./navbar";
import { PlayIcon, PauseIcon, SpeakerWaveIcon, BackwardIcon, ForwardIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';

export default function ListenerDashboard({ user }: { user: any }) {
  const [currentTrack, setCurrentTrack] = useState({
    id: "1",
    title: "Midnight Dreams",
    artist: "Luna Artist",
    duration: 240,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&q=80",
    album: "Night Vibes",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isVolumeDragging, setIsVolumeDragging] = useState(false);
  const [showProgressSlider, setShowProgressSlider] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one

  const progressSliderRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    console.log("Next track");
  };

  const handlePrevious = () => {
    console.log("Previous track");
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressSliderRef.current) return;
    
    const rect = progressSliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    const newTime = Math.max(0, Math.min(currentTrack.duration, percent * currentTrack.duration));
    setCurrentTime(newTime);
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeSliderRef.current) return;
    
    const rect = volumeSliderRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    const newVolume = Math.max(0, Math.min(100, percent * 100));
    setVolume(newVolume);
  };

  const handleProgressDrag = (e: MouseEvent) => {
    if (!isDragging) return;
    if (progressSliderRef.current) {
      const rect = progressSliderRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percent = clickX / width;
      const newTime = Math.max(0, Math.min(currentTrack.duration, percent * currentTrack.duration));
      setCurrentTime(newTime);
    }
  };

  const handleVolumeDrag = (e: MouseEvent) => {
    if (!isVolumeDragging) return;
    if (volumeSliderRef.current) {
      const rect = volumeSliderRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percent = clickX / width;
      const newVolume = Math.max(0, Math.min(100, percent * 100));
      setVolume(newVolume);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsVolumeDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleProgressDrag(e);
      }
      if (isVolumeDragging) {
        handleVolumeDrag(e);
      }
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, isVolumeDragging]);

  const playlists = [
    {
      id: "1",
      name: "Chill Vibes",
      tracks: 23,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80",
      type: "playlist",
    },
    {
      id: "2", 
      name: "Workout Mix",
      tracks: 18,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80",
      type: "playlist",
    },
    {
      id: "3",
      name: "Late Night",
      tracks: 31,
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&q=80",
      type: "playlist",
    },
    {
      id: "4",
      name: "Top Hits 2024",
      tracks: 50,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80",
      type: "playlist",
    },
  ];

  const likedSongs = [
    {
      id: "1",
      title: "Midnight Dreams",
      artist: "Luna Artist",
      duration: 240,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&q=80",
    },
    {
      id: "2",
      title: "Electric Vibes",
      artist: "Neon Beats", 
      duration: 195,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&q=80",
    },
    {
      id: "3",
      title: "Ocean Waves",
      artist: "Calm Sounds",
      duration: 320,
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=100&q=80",
    },
  ];

  const queue = [
    { title: "Electric Vibes", artist: "Neon Beats", duration: 195 },
    { title: "Ocean Waves", artist: "Calm Sounds", duration: 320 },
    { title: "City Lights", artist: "Urban Flow", duration: 280 },
    { title: "Summer Nights", artist: "Sunset Dreams", duration: 245 },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Blob Animation Background */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-900 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-800 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-96 h-96 bg-orange-700 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Universal Navbar */}
      <Navbar />
      
      {/* Mobile Sidebar Toggle Buttons */}
      <div className="fixed top-20 left-4 z-40 lg:hidden">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setShowLeftSidebar(!showLeftSidebar)}
          className="bg-black/80 backdrop-blur-sm border border-gray-800 text-white hover:text-orange-500 h-10 w-10"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div className="fixed top-20 right-4 z-40 lg:hidden">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setShowRightSidebar(!showRightSidebar)}
          className="bg-black/80 backdrop-blur-sm border border-gray-800 text-white hover:text-orange-500 h-10 w-10"
        >
          <Music className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Main Spotify-style 3-Column Bento Layout */}
      <div className="grid grid-cols-12 gap-4 flex-1 pt-16 pb-24 relative z-10 min-h-0 h-full">
        {/* Left Sidebar - Playlists, Liked, etc. */}
        <aside className="col-span-2 bg-black rounded-xl p-3 flex flex-col gap-4 min-h-0 h-full">
          <div className="bg-zinc-900 rounded-xl p-4 flex flex-col items-start gap-2">
            <span className="text-white font-bold text-lg mb-2">Your Library</span>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-orange-500 rounded-lg">Playlists</Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-orange-500 rounded-lg">Liked Songs</Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-orange-500 rounded-lg">My Playlists</Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-orange-500 rounded-lg">Discover</Button>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-orange-500 rounded-lg">Saved Playlists</Button>
          </div>
        </aside>

        {/* Center Main Content (scrollable) */}
        <main className="col-span-8 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-96px)]">
          {/* Stats Section with Blob Animation */}
          <section className="relative rounded-xl overflow-hidden border border-zinc-800">
            {/* Blob Animation BG */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-orange-900 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-orange-800 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-blob animation-delay-2000"></div>
              <div className="absolute top-32 left-1/2 w-80 h-80 bg-orange-700 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-4000"></div>
            </div>
            <div className="relative z-10 grid grid-cols-4 gap-4 p-6">
              <div className="bg-black/70 rounded-lg p-4 flex flex-col items-center">
                <span className="text-2xl font-bold text-orange-500">127</span>
                <span className="text-xs text-gray-400">Hours Listened</span>
              </div>
              <div className="bg-black/70 rounded-lg p-4 flex flex-col items-center">
                <span className="text-2xl font-bold text-orange-500">89</span>
                <span className="text-xs text-gray-400">Liked Songs</span>
              </div>
              <div className="bg-black/70 rounded-lg p-4 flex flex-col items-center">
                <span className="text-2xl font-bold text-orange-500">12</span>
                <span className="text-xs text-gray-400">Top Charts</span>
              </div>
              <div className="bg-black/70 rounded-lg p-4 flex flex-col items-center">
                <span className="text-2xl font-bold text-orange-500">7</span>
                <span className="text-xs text-gray-400">Playlists</span>
              </div>
            </div>
          </section>

          {/* Featured Playlists/Discover Section - solid black bg */}
          <section className="rounded-xl bg-black border border-zinc-800 p-6 grid grid-cols-2 gap-4">
            <div className="bg-zinc-900 rounded-lg p-6 flex flex-col justify-between">Featured Playlist 1</div>
            <div className="bg-zinc-900 rounded-lg p-6 flex flex-col justify-between">Featured Playlist 2</div>
            <div className="bg-zinc-900 rounded-lg p-6 flex flex-col justify-between">Recommended For You</div>
            <div className="bg-zinc-900 rounded-lg p-6 flex flex-col justify-between">Genres</div>
          </section>
        </main>

        {/* Right Sidebar - Song/Artist Info, Recommendations */}
        <aside className="col-span-2 bg-black rounded-xl p-3 flex flex-col gap-4 min-h-0 h-full">
          <div className="bg-zinc-900 rounded-xl p-4 flex flex-col items-center justify-center min-h-[180px]">Song Info</div>
          <div className="bg-zinc-900 rounded-xl p-4 flex flex-col items-center justify-center min-h-[180px]">Artist Info</div>
          <div className="bg-zinc-900 rounded-xl p-4 flex flex-col items-center justify-center min-h-[180px]">Recommended Songs</div>
        </aside>
      </div>

      {/* Bottom Music Control Bar - Spotify Inspired, True Left/Center/Right Layout */}
      <div className="fixed bottom-0 left-0 right-0 bg-black z-50 py-2 w-full px-4" style={{boxShadow: '0 -2px 16px 0 rgba(0,0,0,0.7)'}}>
        <div className="relative flex justify-between items-center w-full min-h-[64px]">
          {/* Left - Song Info + Love Button (hug left edge) */}
          <div className="flex items-center min-w-0 w-[320px] gap-3">
            <img 
              src={currentTrack.image} 
              alt={currentTrack.title}
              className="w-10 h-10 rounded object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex flex-col justify-center">
              <p className="font-medium text-white text-sm truncate">{currentTrack.title}</p>
              <p className="text-xs text-gray-400 truncate">{currentTrack.artist}</p>
            </div>
            <button
              onClick={toggleLike}
              className="h-7 w-7 ml-2 flex items-center justify-center group"
              aria-label="Like"
            >
              {isLiked ? (
                <HeartSolid className="h-5 w-5 text-orange-500 transition-all duration-200" />
              ) : (
                <HeartOutline className="h-5 w-5 text-white group-hover:text-orange-500 group-hover:drop-shadow-[0_0_6px_rgba(255,115,0,0.7)] transition-all duration-200" />
              )}
            </button>
          </div>

          {/* Center - Controls & Timeline (absolutely centered) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[400px]">
            <div className="flex items-center gap-4 justify-center mb-1">
              {/* Shuffle */}
              <button
                className={`h-8 w-8 flex items-center justify-center transition ${isShuffled ? 'text-orange-500' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setIsShuffled((s) => !s)}
                aria-label="Shuffle"
              >
                <Shuffle className="h-6 w-6" strokeWidth={1} style={{fill: 'none', stroke: 'currentColor'}} />
              </button>
              {/* Previous */}
              <button className="h-8 w-8 flex items-center justify-center transition text-gray-400 hover:text-white" onClick={handlePrevious}>
                <SkipBack className="h-6 w-6" style={{fill: 'currentColor', stroke: 'currentColor'}} />
              </button>
              {/* Play/Pause */}
              <button
                onClick={handlePlayPause}
                className="flex items-center justify-center rounded-full bg-white text-black shadow-lg h-8 w-8 focus:outline-none transition hover:scale-105"
                style={{boxShadow: '0 2px 8px 0 rgba(0,0,0,0.2)'}}
              >
                {isPlaying ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="3" width="4" height="14" rx="1" />
                    <rect x="12" y="3" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="black" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="5,3 17,10 5,17" />
                  </svg>
                )}
              </button>
              {/* Next */}
              <button className="h-8 w-8 flex items-center justify-center transition text-gray-400 hover:text-white" onClick={handleNext}>
                <SkipForward className="h-6 w-6" style={{fill: 'currentColor', stroke: 'currentColor'}} />
              </button>
              {/* Repeat */}
              <button
                className={`h-8 w-8 flex items-center justify-center transition ${repeatMode > 0 ? 'text-orange-500' : 'text-gray-400 hover:text-white'} relative`}
                onClick={() => setRepeatMode((prev) => (prev + 1) % 3)}
                aria-label="Repeat"
              >
                <Repeat className="h-6 w-6" strokeWidth={1} style={{fill: 'none', stroke: 'currentColor'}} />
                {repeatMode === 2 && (
                  <span className="absolute -top-1 -right-1 text-xs bg-orange-500 text-white rounded-full w-3 h-3 flex items-center justify-center">1</span>
                )}
              </button>
            </div>
            <div className="flex items-center gap-1 w-full group select-none justify-center mt-0.5">
              <span className="text-xs text-gray-400 text-right">{formatTime(currentTime)}</span>
              <div className="flex-1 flex justify-center mx-1">
                <div 
                  ref={progressSliderRef}
                  className={`relative h-0.5 rounded-full bg-white/20 cursor-pointer transition-opacity duration-200 ${showProgressSlider ? 'opacity-100' : 'opacity-70'} w-full`}
                  onMouseEnter={() => setShowProgressSlider(true)}
                  onMouseLeave={() => setShowProgressSlider(false)}
                  onClick={handleProgressClick}
                  onMouseDown={(e) => {
                    setIsDragging(true);
                    handleProgressClick(e);
                  }}
                >
                  <div 
                    className="absolute h-full bg-white rounded-full transition-all duration-200"
                    style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
                  />
                  {showProgressSlider && (
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow transition-all duration-200 border border-gray-300"
                      style={{ left: `calc(${(currentTime / currentTrack.duration) * 100}% - 6px)` }}
                    />
                  )}
                </div>
              </div>
              <span className="text-xs text-gray-400 text-left">{formatTime(currentTrack.duration)}</span>
            </div>
          </div>

          {/* Right - Volume & Utilities (hug right edge) */}
          <div className="flex items-center gap-3 min-w-0 w-[220px] justify-end pr-0 mr-0">
            <button
              className={`h-8 w-8 flex items-center justify-center transition text-gray-400 hover:text-white ${muted ? 'opacity-70' : ''}`}
              onClick={() => setMuted((m) => !m)}
              aria-label="Mute/Unmute"
            >
              {muted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
            <div 
              ref={volumeSliderRef}
              className={`w-24 relative h-0.5 rounded-full bg-white/20 cursor-pointer transition-opacity duration-200 ${showVolumeSlider ? 'opacity-100' : 'opacity-70'}`}
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
              onClick={handleVolumeClick}
              onMouseDown={(e) => {
                setIsVolumeDragging(true);
                handleVolumeClick(e);
              }}
            >
              <div 
                className="absolute h-full bg-white rounded-full transition-all duration-200"
                style={{ width: muted ? 0 : `${volume}%` }}
              />
              {showVolumeSlider && (
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow transition-all duration-200 border border-gray-300"
                  style={{ left: `calc(${volume}% - 6px)` }}
                />
              )}
            </div>
            {/* Utility icons can be added here if needed */}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {(showLeftSidebar || showRightSidebar) && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => {
            setShowLeftSidebar(false);
            setShowRightSidebar(false);
          }}
        />
      )}
    </div>
  );
}
