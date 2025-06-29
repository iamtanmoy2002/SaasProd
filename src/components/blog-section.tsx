import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Music } from "lucide-react";

const featuredArticles = [
  {
    title: "The Future of Music Streaming in 2024",
    excerpt: "Discover how AI and blockchain are revolutionizing the music industry and what it means for artists and listeners.",
    author: "Music Tech Weekly",
    date: "Dec 22, 2024",
    readTime: "5 min read",
    category: "Industry News",
    image: "📱"
  },
  {
    title: "How Independent Artists Are Thriving",
    excerpt: "Meet the artists who are building successful careers without major label backing through direct fan connections.",
    author: "Artist Spotlight",
    date: "Dec 20, 2024",
    readTime: "7 min read",
    category: "Artist Stories",
    image: "🎤"
  },
  {
    title: "Top 10 Music Production Tips for Beginners",
    excerpt: "Essential techniques and tools every aspiring producer needs to know to create professional-quality music.",
    author: "Producer Guide",
    date: "Dec 18, 2024",
    readTime: "8 min read",
    category: "Tutorials",
    image: "🎧"
  }
];

const blogCategories = [
  {
    title: "Industry News",
    count: "45",
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    title: "Artist Stories",
    count: "32",
    icon: <Music className="w-5 h-5" />
  },
  {
    title: "Tutorials",
    count: "28",
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    title: "Reviews",
    count: "19",
    icon: <BookOpen className="w-5 h-5" />
  }
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-orange-500">Music Blog</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Stay updated with the latest music industry news, artist stories, and production tips
          </p>
        </div>

        {/* Blog Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {blogCategories.map((category, index) => (
            <div
              key={index}
              className="bg-black rounded-2xl p-6 text-center border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{category.title}</h3>
              <p className="text-orange-500 font-bold">{category.count} articles</p>
            </div>
          ))}
        </div>

        {/* Featured Articles */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Latest Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article, index) => (
              <div
                key={index}
                className="bg-black rounded-2xl border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{article.image}</div>
                  <div className="mb-4">
                    <span className="text-orange-500 text-sm font-medium">{article.category}</span>
                  </div>
                  <h4 className="text-white font-semibold mb-3 text-lg group-hover:text-orange-500 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{article.author}</span>
                    <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/blog"
            className="inline-flex items-center px-8 py-4 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Read More Articles
            <BookOpen className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
} 