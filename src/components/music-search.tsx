"use client";

import { useState } from "react";
import { Search, Play, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { searchSongs } from "@/app/actions";

interface Track {
  track?: {
    key: string;
    title: string;
    subtitle: string;
    images?: {
      coverart?: string;
    };
    hub?: {
      actions?: Array<{
        uri?: string;
      }>;
    };
  };
}

interface MusicSearchProps {
  onTrackSelect?: (track: any) => void;
}

export default function MusicSearch({ onTrackSelect }: MusicSearchProps) {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const results = await searchSongs(query);
      setTracks(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Card className="border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-900">
          <Search className="h-5 w-5" />
          Search Music
        </CardTitle>
        <CardDescription>Search for songs using Shazam API</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search for songs, artists..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>

        {tracks.length > 0 && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {tracks.map((item, index) => {
              const track = item.track;
              if (!track) return null;

              return (
                <div
                  key={track.key || index}
                  className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center overflow-hidden">
                    {track.images?.coverart ? (
                      <img
                        src={track.images.coverart}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-6 h-6 bg-purple-600 rounded" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-purple-900 truncate">
                      {track.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {track.subtitle}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-purple-600 hover:text-purple-800"
                      onClick={() => {
                        if (onTrackSelect) {
                          onTrackSelect({
                            id: track.key,
                            title: track.title,
                            artist: track.subtitle,
                            duration: 240, // Default duration
                            image: track.images?.coverart,
                            url: track.hub?.actions?.[0]?.uri,
                          });
                        }
                      }}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-purple-600 hover:text-purple-800"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tracks.length === 0 && query && !isLoading && (
          <p className="text-center text-muted-foreground py-4">
            No tracks found. Try a different search term.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
