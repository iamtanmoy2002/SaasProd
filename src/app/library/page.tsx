import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Search, Play, Heart, Plus, Filter, Music, Clock, Users, Dumbbell, Moon, PartyPopper } from "lucide-react";

const musicCategories = [
  {
    title: "Recently Played",
    count: "25",
    icon: <Clock className="w-6 h-6 text-white" />
  },
  {
    title: "Liked Songs",
    count: "150",
    icon: <Heart className="w-6 h-6 text-white" />
  },
  {
    title: "My Playlists",
    count: "12",
    icon: <Music className="w-6 h-6 text-white" />
  },
  {
    title: "Following",
    count: "45",
    icon: <Users className="w-6 h-6 text-white" />
  }
];

const featuredPlaylists = [
  {
    title: "Chill Vibes",
    creator: "Groovyy",
    songs: 24,
    duration: "1h 23m",
    icon: <Music className="w-8 h-8 text-orange-500" />,
    followers: "2.5K"
  },
  {
    title: "Workout Mix",
    creator: "Fitness Beats",
    songs: 18,
    duration: "1h 15m",
    icon: <Dumbbell className="w-8 h-8 text-orange-500" />,
    followers: "1.8K"
  },
  {
    title: "Late Night Jazz",
    creator: "Jazz Collective",
    songs: 32,
    duration: "2h 10m",
    icon: <Moon className="w-8 h-8 text-orange-500" />,
    followers: "3.2K"
  },
  {
    title: "Party Anthems",
    creator: "DJ Mix",
    songs: 28,
    duration: "1h 45m",
    icon: <PartyPopper className="w-8 h-8 text-orange-500" />,
    followers: "4.1K"
  }
];

const recentTracks = [
  {
    title: "Midnight Dreams",
    artist: "Luna Nova",
    duration: "3:45",
    icon: <Music className="w-6 h-6 text-orange-500" />,
    album: "Stellar"
  },
  {
    title: "Electric Pulse",
    artist: "SynthWave",
    duration: "4:12",
    icon: <Music className="w-6 h-6 text-orange-500" />,
    album: "Digital Age"
  },
  {
    title: "Soul Connection",
    artist: "Harmony Soul",
    duration: "3:58",
    icon: <Music className="w-6 h-6 text-orange-500" />,
    album: "Heartstrings"
  },
  {
    title: "Urban Flow",
    artist: "Street Beats",
    duration: "3:22",
    icon: <Music className="w-6 h-6 text-orange-500" />,
    album: "City Lights"
  }
];

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black w-full flex flex-col items-center justify-center min-h-[60vh]">
        {/* Animated dark background with orange hint */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-900 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-800 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-96 h-96 bg-orange-700 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center px-4 py-20 gap-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-2 text-center">
            Music <span className="text-orange-500">Library</span>
          </h1>
          <p className="text-gray-300 max-w-xl mb-2 text-lg text-center">
            Your personal music collection, playlists, and favorite tracks all in one place
          </p>
          <div className="w-full max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Search your library, playlists, or artists..."
              className="w-full pl-12 pr-4 py-4 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 bg-transparent"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">Your Library</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {musicCategories.map((category, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-2xl p-6 text-center border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{category.title}</h3>
                <p className="text-orange-500 font-bold">{category.count} items</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Playlists */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-orange-500">Featured Playlists</h2>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Create Playlist
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPlaylists.map((playlist, index) => (
              <div
                key={index}
                className="bg-black rounded-2xl p-6 border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">{playlist.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{playlist.title}</h4>
                    <p className="text-gray-400 text-sm">{playlist.creator}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{playlist.songs} songs</span>
                    <span>{playlist.duration}</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {playlist.followers} followers
                  </div>
                  <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center">
                    <Play className="w-4 h-4 mr-2" />
                    Play Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Tracks */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">Recently Played</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentTracks.map((track, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">{track.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{track.title}</h4>
                    <p className="text-gray-400 text-sm">{track.artist}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-orange-500 text-sm font-medium">{track.album}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{track.duration}</span>
                    <div className="flex gap-2">
                      <button className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                        <Play className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2 text-orange-500">1.2K+</div>
              <div className="text-gray-300">Songs</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-orange-500">45</div>
              <div className="text-gray-300">Playlists</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-orange-500">150</div>
              <div className="text-gray-300">Liked Songs</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-orange-500">85h</div>
              <div className="text-gray-300">Listening Time</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 