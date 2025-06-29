import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Search, Filter, Music, Star, TrendingUp, Users, Headphones, Mic } from "lucide-react";

const beatCategories = [
  {
    icon: <Music className="w-6 h-6 text-white" />,
    title: "Hip Hop",
    count: "2.5K+",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Headphones className="w-6 h-6 text-white" />,
    title: "Electronic",
    count: "1.8K+",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Mic className="w-6 h-6 text-white" />,
    title: "R&B",
    count: "1.2K+",
    color: "from-red-500 to-orange-500"
  },
  {
    icon: <Star className="w-6 h-6 text-white" />,
    title: "Pop",
    count: "3.1K+",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <Music className="w-6 h-6 text-white" />,
    title: "Trap",
    count: "900+",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: <Music className="w-6 h-6 text-white" />,
    title: "Jazz",
    count: "600+",
    color: "from-indigo-500 to-purple-500"
  }
];

const featuredProducers = [
  {
    name: "DJ Nova",
    genre: "Hip Hop",
    rating: 4.9,
    beats: 127,
    icon: <Music className="w-8 h-8 text-orange-500" />,
    price: "$50-200"
  },
  {
    name: "SynthWave",
    genre: "Electronic",
    rating: 4.8,
    beats: 89,
    icon: <Headphones className="w-8 h-8 text-orange-500" />,
    price: "$75-300"
  },
  {
    name: "SoulMaster",
    genre: "R&B",
    rating: 4.9,
    beats: 156,
    icon: <Mic className="w-8 h-8 text-orange-500" />,
    price: "$60-250"
  },
  {
    name: "BeatMaker Pro",
    genre: "Trap",
    rating: 4.7,
    beats: 203,
    icon: <Star className="w-8 h-8 text-orange-500" />,
    price: "$40-180"
  }
];

export default function MarketplacePage() {
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
            Beat <span className="text-orange-500">Marketplace</span>
          </h1>
          <p className="text-gray-300 max-w-xl mb-2 text-lg text-center">
            Discover and purchase high-quality beats from talented producers worldwide
          </p>
          <div className="w-full max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Search for beats, producers, or genres..."
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
            {beatCategories.map((category, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-2xl p-6 text-center border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{category.title}</h3>
                <p className="text-orange-500 font-bold">{category.count} beats</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Producers */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">Featured Producers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducers.map((producer, index) => (
              <div
                key={index}
                className="bg-black rounded-2xl p-6 border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">{producer.icon}</div>
                  <div>
                    <h4 className="text-white font-semibold">{producer.name}</h4>
                    <p className="text-gray-400 text-sm">{producer.genre}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-white font-semibold">{producer.rating}</span>
                    </div>
                    <span className="text-orange-500 font-semibold">{producer.beats} beats</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Price range:</span>
                    <span className="text-green-500 font-semibold">{producer.price}</span>
                  </div>
                  <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Beats
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2 text-orange-500">10K+</div>
              <div className="text-gray-300">Beats Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-orange-500">500+</div>
              <div className="text-gray-300">Producers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-orange-500">50K+</div>
              <div className="text-gray-300">Downloads</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-orange-500">4.8</div>
              <div className="text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 