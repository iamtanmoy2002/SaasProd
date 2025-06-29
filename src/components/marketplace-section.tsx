import { Music, TrendingUp, Users, Star } from "lucide-react";

const beatCategories = [
  {
    icon: <Music className="w-6 h-6" />,
    title: "Hip Hop",
    count: "2.5K+",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Music className="w-6 h-6" />,
    title: "Electronic",
    count: "1.8K+",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Music className="w-6 h-6" />,
    title: "R&B",
    count: "1.2K+",
    color: "from-red-500 to-orange-500"
  },
  {
    icon: <Music className="w-6 h-6" />,
    title: "Pop",
    count: "3.1K+",
    color: "from-green-500 to-emerald-500"
  }
];

const featuredProducers = [
  {
    name: "DJ Nova",
    genre: "Hip Hop",
    rating: 4.9,
    beats: 127,
    avatar: "🎵"
  },
  {
    name: "SynthWave",
    genre: "Electronic",
    rating: 4.8,
    beats: 89,
    avatar: "🎧"
  },
  {
    name: "SoulMaster",
    genre: "R&B",
    rating: 4.9,
    beats: 156,
    avatar: "🎤"
  }
];

export default function MarketplaceSection() {
  return (
    <section className="py-24 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-orange-500">Beat Marketplace</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Discover and purchase high-quality beats from talented producers worldwide
          </p>
        </div>

        {/* Beat Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {beatCategories.map((category, index) => (
            <div
              key={index}
              className="bg-black rounded-2xl p-6 text-center border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                {category.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{category.title}</h3>
              <p className="text-orange-500 font-bold">{category.count} beats</p>
            </div>
          ))}
        </div>

        {/* Featured Producers */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Featured Producers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducers.map((producer, index) => (
              <div
                key={index}
                className="bg-black rounded-2xl p-6 border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{producer.avatar}</div>
                  <div>
                    <h4 className="text-white font-semibold">{producer.name}</h4>
                    <p className="text-gray-400 text-sm">{producer.genre}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="text-white font-semibold">{producer.rating}</span>
                  </div>
                  <span className="text-orange-500 font-semibold">{producer.beats} beats</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/marketplace"
            className="inline-flex items-center px-8 py-4 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Explore Marketplace
            <TrendingUp className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
} 