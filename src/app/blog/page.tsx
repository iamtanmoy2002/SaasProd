import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Search, Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Music, Filter, Star } from "lucide-react";

const blogCategories = [
  {
    title: "Industry News",
    count: "45",
    icon: <TrendingUp className="w-5 h-5 text-orange-500" />
  },
  {
    title: "Artist Stories",
    count: "32",
    icon: <Star className="w-5 h-5 text-orange-500" />
  },
  {
    title: "Tutorials",
    count: "28",
    icon: <BookOpen className="w-5 h-5 text-orange-500" />
  },
  {
    title: "Reviews",
    count: "19",
    icon: <Music className="w-5 h-5 text-orange-500" />
  },
  {
    title: "Technology",
    count: "15",
    icon: <TrendingUp className="w-5 h-5 text-orange-500" />
  },
  {
    title: "Interviews",
    count: "23",
    icon: <Star className="w-5 h-5 text-orange-500" />
  }
];

const featuredArticles = [
  {
    title: "The Future of Music Streaming in 2024",
    excerpt: "Discover how AI and blockchain are revolutionizing the music industry and what it means for artists and listeners.",
    author: "Music Tech Weekly",
    date: "Dec 22, 2024",
    readTime: "5 min read",
    category: "Industry News",
    icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
    views: "12K"
  },
  {
    title: "How Independent Artists Are Thriving",
    excerpt: "Meet the artists who are building successful careers without major label backing through direct fan connections.",
    author: "Artist Spotlight",
    date: "Dec 20, 2024",
    readTime: "7 min read",
    category: "Artist Stories",
    icon: <Star className="w-8 h-8 text-orange-500" />,
    views: "8.5K"
  },
  {
    title: "Top 10 Music Production Tips for Beginners",
    excerpt: "Essential techniques and tools every aspiring producer needs to know to create professional-quality music.",
    author: "Producer Guide",
    date: "Dec 18, 2024",
    readTime: "8 min read",
    category: "Tutorials",
    icon: <BookOpen className="w-8 h-8 text-orange-500" />,
    views: "15K"
  },
  {
    title: "Album Review: The New Era of Hip-Hop",
    excerpt: "Breaking down the latest releases and what they mean for the future of the genre.",
    author: "Music Critic",
    date: "Dec 16, 2024",
    readTime: "6 min read",
    category: "Reviews",
    icon: <Music className="w-8 h-8 text-orange-500" />,
    views: "10K"
  }
];

const latestArticles = [
  {
    title: "Spotify vs Apple Music: Which Platform Pays Artists More?",
    excerpt: "A comprehensive comparison of streaming platform revenue models and artist payouts.",
    author: "Industry Analyst",
    date: "Dec 15, 2024",
    readTime: "4 min read",
    category: "Industry News",
    icon: <TrendingUp className="w-6 h-6 text-orange-500" />
  },
  {
    title: "Interview: Behind the Scenes with Grammy Winner",
    excerpt: "Exclusive insights into the creative process and career journey of this year's Grammy winner.",
    author: "Music Journalist",
    date: "Dec 14, 2024",
    readTime: "9 min read",
    category: "Interviews",
    icon: <Star className="w-6 h-6 text-orange-500" />
  },
  {
    title: "The Rise of AI-Generated Music: Threat or Opportunity?",
    excerpt: "Exploring the impact of artificial intelligence on music creation and the industry's future.",
    author: "Tech Writer",
    date: "Dec 13, 2024",
    readTime: "7 min read",
    category: "Technology",
    icon: <TrendingUp className="w-6 h-6 text-orange-500" />
  }
];

export default function BlogPage() {
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
            Music <span className="text-orange-500">Blog</span>
          </h1>
          <p className="text-gray-300 max-w-xl mb-2 text-lg text-center">
            Stay updated with the latest music industry news, artist stories, and production tips
          </p>
          <div className="w-full max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Search for articles, authors, or topics..."
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
            {blogCategories.map((category, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-2xl p-6 text-center border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{category.title}</h3>
                <p className="text-orange-500 font-bold">{category.count} articles</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredArticles.map((article, index) => (
              <div
                key={index}
                className="bg-black rounded-2xl border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{article.icon}</div>
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
                    <span className="text-gray-400 text-sm">{article.views} views</span>
                  </div>
                  <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArticles.map((article, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">{article.icon}</div>
                  <div className="flex-1">
                    <span className="text-orange-500 text-sm font-medium">{article.category}</span>
                    <h4 className="text-white font-semibold mb-1 mt-1">{article.title}</h4>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
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
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2 text-orange-500">150+</div>
              <div className="text-gray-300">Articles</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-orange-500">25+</div>
              <div className="text-gray-300">Authors</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-orange-500">500K+</div>
              <div className="text-gray-300">Readers</div>
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