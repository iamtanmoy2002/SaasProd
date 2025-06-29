import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Search, Play, Headphones, Mic, Clock, Users, Filter, Star, Music, TrendingUp } from "lucide-react";

const podcastCategories = [
  {
    title: "Music Interviews",
    count: "500+",
    icon: <Mic className="w-6 h-6 text-white" />
  },
  {
    title: "Behind the Scenes",
    count: "300+",
    icon: <Headphones className="w-6 h-6 text-white" />
  },
  {
    title: "Music History",
    count: "200+",
    icon: <Play className="w-6 h-6 text-white" />
  },
  {
    title: "Artist Stories",
    count: "400+",
    icon: <Users className="w-6 h-6 text-white" />
  },
  {
    title: "Production Tips",
    count: "150+",
    icon: <Headphones className="w-6 h-6 text-white" />
  },
  {
    title: "Industry News",
    count: "250+",
    icon: <Mic className="w-6 h-6 text-white" />
  }
];

const featuredShows = [
  {
    title: "The Groovyy Sessions",
    host: "DJ Nova",
    duration: "45 min",
    listeners: "12K",
    icon: <Mic className="w-8 h-8 text-orange-500" />,
    category: "Music Interviews",
    episodes: 127
  },
  {
    title: "Behind the Beat",
    host: "Producer X",
    duration: "32 min",
    listeners: "8.5K",
    icon: <Headphones className="w-8 h-8 text-orange-500" />,
    category: "Behind the Scenes",
    episodes: 89
  },
  {
    title: "Music Legends",
    host: "History Buff",
    duration: "58 min",
    listeners: "15K",
    icon: <Star className="w-8 h-8 text-orange-500" />,
    category: "Music History",
    episodes: 156
  },
  {
    title: "Artist Spotlight",
    host: "Music Weekly",
    duration: "40 min",
    listeners: "10K",
    icon: <Music className="w-8 h-8 text-orange-500" />,
    category: "Artist Stories",
    episodes: 203
  }
];

const trendingEpisodes = [
  {
    title: "How Drake Changed the Game",
    show: "Music Legends",
    duration: "52 min",
    listeners: "25K",
    icon: <Star className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Studio Secrets with Metro Boomin",
    show: "Behind the Beat",
    duration: "38 min",
    listeners: "18K",
    icon: <Headphones className="w-6 h-6 text-orange-500" />
  },
  {
    title: "The Future of Streaming",
    show: "Industry News",
    duration: "45 min",
    listeners: "22K",
    icon: <TrendingUp className="w-6 h-6 text-orange-500" />
  }
];

export default function PodcastsPage() {
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
            Pod<span className="text-orange-500">cast</span>
          </h1>
          <p className="text-gray-300 max-w-xl mb-2 text-lg text-center">
            Dive deep into the world of music with exclusive podcasts from artists and industry experts
          </p>
          <div className="w-full max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Search for podcasts, hosts, or topics..."
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
          <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {podcastCategories.map((category, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-2xl p-6 text-center border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{category.title}</h3>
                <p className="text-orange-500 font-bold">{category.count} episodes</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Shows */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">Featured Shows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredShows.map((show, index) => (
              <div
                key={index}
                className="bg-black rounded-2xl p-6 border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">{show.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{show.title}</h4>
                    <p className="text-gray-400 text-sm">{show.host}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-orange-500 text-sm font-medium">{show.category}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {show.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {show.listeners}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {show.episodes} episodes
                  </div>
                  <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center">
                    <Play className="w-4 h-4 mr-2" />
                    Listen Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Episodes */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">Trending Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingEpisodes.map((episode, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">{episode.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{episode.title}</h4>
                    <p className="text-gray-400 text-sm">{episode.show}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {episode.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {episode.listeners}
                  </div>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center">
                  <Play className="w-4 h-4 mr-2" />
                  Play Episode
                </button>
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
              <div className="text-3xl font-bold mb-2 text-orange-500">2K+</div>
              <div className="text-gray-300">Episodes</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-orange-500">100+</div>
              <div className="text-gray-300">Shows</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-orange-500">500K+</div>
              <div className="text-gray-300">Downloads</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-orange-500">4.9</div>
              <div className="text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 