import { Users, Heart, MessageCircle, Star, Crown, Gift } from "lucide-react";

const communityFeatures = [
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: "Direct Messaging",
    description: "Connect directly with your favorite artists",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Exclusive Content",
    description: "Access subscriber-only tracks and behind-the-scenes",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: <Crown className="w-6 h-6" />,
    title: "VIP Experiences",
    description: "Meet & greets, private concerts, and special events",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: <Gift className="w-6 h-6" />,
    title: "Artist Support",
    description: "Tips, subscriptions, and direct financial support",
    color: "from-green-500 to-emerald-500"
  }
];

const communityStats = [
  {
    number: "50K+",
    label: "Active Fans",
    icon: <Users className="w-8 h-8" />
  },
  {
    number: "2.5K+",
    label: "Artists",
    icon: <Star className="w-8 h-8" />
  },
  {
    number: "100K+",
    label: "Messages Sent",
    icon: <MessageCircle className="w-8 h-8" />
  },
  {
    number: "500+",
    label: "Exclusive Events",
    icon: <Crown className="w-8 h-8" />
  }
];

const featuredArtists = [
  {
    name: "Luna Nova",
    genre: "Alternative Pop",
    followers: "25K",
    avatar: "🌟",
    status: "Live Now"
  },
  {
    name: "DJ Pulse",
    genre: "Electronic",
    followers: "18K",
    avatar: "⚡",
    status: "New Release"
  },
  {
    name: "Soul Harmony",
    genre: "R&B",
    followers: "32K",
    avatar: "🎵",
    status: "Exclusive Content"
  }
];

export default function CommunitySection() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-orange-500">Community</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Connect directly with artists, access exclusive content, and be part of the music revolution
          </p>
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {communityFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-2xl p-6 text-center border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {communityStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-orange-500 mb-4 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Artists */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Featured Artists</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArtists.map((artist, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{artist.avatar}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{artist.name}</h4>
                    <p className="text-gray-400 text-sm">{artist.genre}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{artist.followers} followers</span>
                    <span className="text-orange-500 text-sm font-medium">{artist.status}</span>
                  </div>
                  <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Follow Artist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/community"
            className="inline-flex items-center px-8 py-4 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Join the Community
            <Users className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
} 