"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Heart,
  Shuffle,
  Repeat,
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Card } from "./ui/card";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: number;
  url?: string;
  image?: string;
}

interface MusicPlayerProps {
  currentTrack?: Track;
  isPlaying?: boolean;
  onPlayPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onSeek?: (time: number) => void;
  currentTime?: number;
  volume?: number;
  onVolumeChange?: (volume: number) => void;
}

export default function MusicPlayer({
  currentTrack = {
    id: "1",
    title: "Midnight Dreams",
    artist: "Luna Artist",
    duration: 240,
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&q=80",
  },
  isPlaying = false,
  onPlayPause = () => {},
  onNext = () => {},
  onPrevious = () => {},
  onSeek = () => {},
  currentTime = 0,
  volume = 70,
  onVolumeChange = () => {},
}: MusicPlayerProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = currentTrack
    ? (currentTime / currentTrack.duration) * 100
    : 0;

  return (
    <Card className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-200 p-4 shadow-lg z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Track Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center overflow-hidden">
            {currentTrack.image ? (
              <img
                src={currentTrack.image}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 bg-purple-600 rounded" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-sm text-purple-900 truncate">
              {currentTrack.title}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artist}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-red-500"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-md">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-purple-600"
              onClick={() => setIsShuffled(!isShuffled)}
            >
              <Shuffle
                className={`h-4 w-4 ${isShuffled ? "text-purple-800" : ""}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-purple-600"
              onClick={onPrevious}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full"
              onClick={onPlayPause}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-purple-600"
              onClick={onNext}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-purple-600"
              onClick={() => setRepeatMode((prev) => (prev + 1) % 3)}
            >
              <Repeat
                className={`h-4 w-4 ${repeatMode > 0 ? "text-purple-800" : ""}`}
              />
              {repeatMode === 2 && (
                <span className="absolute -top-1 -right-1 text-xs bg-purple-600 text-white rounded-full w-3 h-3 flex items-center justify-center">
                  1
                </span>
              )}
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground min-w-[35px]">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 relative">
              <Slider
                value={[progressPercentage]}
                max={100}
                step={0.1}
                className="w-full"
                onValueChange={([value]) => {
                  if (currentTrack) {
                    onSeek((value / 100) * currentTrack.duration);
                  }
                }}
              />
            </div>
            <span className="text-xs text-muted-foreground min-w-[35px]">
              {formatTime(currentTrack.duration)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          <Volume2 className="h-4 w-4 text-purple-600" />
          <div className="w-24">
            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-full"
              onValueChange={([value]) => onVolumeChange(value)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
