import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Search, Calendar, MapPin, Clock, Users, Filter, Ticket, Star, Building, Music } from "lucide-react";

const upcomingEvents = [
  {
    title: "Groovyy Summer Festival",
    artist: "Multiple Artists",
    date: "July 15, 2024",
    time: "6:00 PM",
    location: "Central Park, NYC",
    price: "$45-120",
    icon: <Music className="w-8 h-8 text-orange-500" />,
    tickets: "Limited"
  },
  {
    title: "Luna Nova Live",
    artist: "Luna Nova",
    date: "August 3, 2024",
    time: "8:00 PM",
    location: "The Grand Hall, LA",
    price: "$35-85",
    icon: <Star className="w-8 h-8 text-orange-500" />,
    tickets: "Available"
  },
  {
    title: "Electronic Night",
    artist: "DJ Pulse & Friends",
    date: "August 10, 2024",
    time: "10:00 PM",
    location: "Club Neon, Miami",
    price: "$25-60",
    icon: <Music className="w-8 h-8 text-orange-500" />,
    tickets: "Selling Fast"
  },
  {
    title: "Jazz Under the Stars",
    artist: "Soul Harmony Quartet",
    date: "August 20, 2024",
    time: "7:30 PM",
    location: "Riverside Amphitheater, Chicago",
    price: "$40-90",
    icon: <Ticket className="w-8 h-8 text-orange-500" />,
    tickets: "Available"
  }
];

const eventCategories = [
  {
    title: "Concerts",
    count: "25",
    icon: <Ticket className="w-6 h-6 text-white" />
  },
  {
    title: "Festivals",
    count: "8",
    icon: <Users className="w-6 h-6 text-white" />
  },
  {
    title: "Club Nights",
    count: "15",
    icon: <Clock className="w-6 h-6 text-white" />
  },
  {
    title: "VIP Events",
    count: "12",
    icon: <Star className="w-6 h-6 text-white" />
  }
];

const featuredVenues = [
  {
    name: "The Grand Hall",
    location: "Los Angeles, CA",
    capacity: "2,500",
    rating: 4.8,
    icon: <Building className="w-8 h-8 text-orange-500" />
  },
  {
    name: "Club Neon",
    location: "Miami, FL",
    capacity: "800",
    rating: 4.6,
    icon: <MapPin className="w-8 h-8 text-orange-500" />
  },
  {
    name: "Riverside Amphitheater",
    location: "Chicago, IL",
    capacity: "5,000",
    rating: 4.9,
    icon: <Star className="w-8 h-8 text-orange-500" />
  }
];

export default function TicketsPage() {
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
            Book <span className="text-orange-500">Tickets</span>
          </h1>
          <p className="text-gray-300 max-w-xl mb-2 text-lg text-center">
            Discover and book tickets for the hottest music events, concerts, and festivals
          </p>
          <div className="w-full max-w-2xl relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Search for events, artists, or venues..."
              className="w-full pl-12 pr-4 py-4 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 bg-transparent"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">Event Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {eventCategories.map((category, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-2xl p-6 text-center border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{category.title}</h3>
                <p className="text-orange-500 font-bold">{category.count} events</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-black rounded-2xl p-6 border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">{event.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{event.title}</h4>
                    <p className="text-gray-400 text-sm">{event.artist}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-500 font-semibold">{event.price}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      event.tickets === 'Limited' ? 'bg-yellow-500 text-black' :
                      event.tickets === 'Selling Fast' ? 'bg-orange-500 text-white' :
                      'bg-green-500 text-white'
                    }`}>
                      {event.tickets}
                    </span>
                  </div>
                  <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center">
                    <Ticket className="w-4 h-4 mr-2" />
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Venues */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-orange-500">Featured Venues</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVenues.map((venue, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">{venue.icon}</div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{venue.name}</h4>
                    <p className="text-gray-400 text-sm">{venue.location}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Capacity:</span>
                    <span className="text-white">{venue.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Rating:</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="text-white">{venue.rating}</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    View Events
                  </button>
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
              <div className="text-3xl font-bold mb-2 text-orange-500">60+</div>
              <div className="text-gray-300">Events</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-orange-500">15+</div>
              <div className="text-gray-300">Venues</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2 text-orange-500">10K+</div>
              <div className="text-gray-300">Tickets Sold</div>
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