import { Play, Headphones, Mic, Clock, Users } from "lucide-react";

const podcastCategories = [
  {
    title: "Music Interviews",
    count: "500+",
    icon: <Mic className="w-6 h-6" />
  },
  {
    title: "Behind the Scenes",
    count: "300+",
    icon: <Headphones className="w-6 h-6" />
  },
  {
    title: "Music History",
    count: "200+",
    icon: <Play className="w-6 h-6" />
  },
  {
    title: "Artist Stories",
    count: "400+",
    icon: <Users className="w-6 h-6" />
  }
];

const featuredShows = [
  {
    title: "The Groovyy Sessions",
    host: "DJ Nova",
    duration: "45 min",
    listeners: "12K",
    image: "🎙️",
    category: "Music Interviews"
  },
  {
    title: "Behind the Beat",
    host: "Producer X",
    duration: "32 min",
    listeners: "8.5K",
    image: "🎧",
    category: "Behind the Scenes"
  },
  {
    title: "Music Legends",
    host: "History Buff",
    duration: "58 min",
    listeners: "15K",
    image: "📻",
    category: "Music History"
  }
];

export default function PodcastsSection() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-orange-500">Podcasts</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Dive deep into the world of music with exclusive podcasts from artists and industry experts
          </p>
        </div>

        {/* Podcast Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
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

        {/* Featured Shows */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Featured Shows</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredShows.map((show, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{show.image}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{show.title}</h4>
                    <p className="text-gray-400 text-sm">{show.host}</p>
                  </div>
                </div>
                <div className="space-y-2">
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
                </div>
                <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center">
                  <Play className="w-4 h-4 mr-2" />
                  Listen Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/podcasts"
            className="inline-flex items-center px-8 py-4 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Browse All Podcasts
            <Headphones className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
} 